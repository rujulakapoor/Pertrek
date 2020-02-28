import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import kerm from './img/kermit.jpg';
import fire from './config/fire';
import Firebase from 'firebase';
class Planner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attractionList: []
    }
  }
  onNavigateHome(){
    this.props.history.push('/Login');
  }
  writeUserData = () => {
    Firebase.database().ref('/').set(this.state);
    console.log('DATA SAVED');
  }
  
  getUserData = () => {
    let ref = Firebase.database().ref('/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
    console.log('DATA RETRIEVED');
  }
  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  render() {
    const { attractionList } = this.state; //COLLECTION NAME
    const { data } = this.props.location;
    return(

      <div className="planner">
        <p>data = { data }</p>
        <div className="row">
          <div className='col-xl-12'>
            <h1>attractionList</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
          { 
            attractionList //COLLECTION NAME
            .map(attraction => 
              <Card key={attraction.uid} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
                <Card.Header as="h5">{ attraction.name }</Card.Header>
                <Card.Img variant="top" src={ attraction.image } />
                <Card.Body>
                  <Card.Text as="h4">
                    Cost: ${ attraction.cost }
                  </Card.Text>
                  <Card.Text as="h4">
                    Estimated duration: { attraction.duration } hours
                  </Card.Text>
                  <Card.Text as="h4">
                    { attraction.popularity } reviews
                  </Card.Text>
                  <Card.Text as="p">
                    { attraction.description }
                  </Card.Text>
                  <Button variant="secondary">Add</Button>
                </Card.Body>
                <Card.Footer as="h3">
                  { attraction.address }
                </Card.Footer>
              </Card>
              )
          } 
          </div>
        </div>
        
        {/* ^^^^^^^ */}
        
        <hr/>
        <div className='row'>
          <div className='col-xl-12'>
            <h1>Add attraction</h1>
            <form onSubmit={ this.handleSubmit }>
              <div className="form-row">
                <input type='hidden' ref='uid' />
                <div className="form-group col-md-6">
                  <label>Name</label>
                  <input type="text" ref='name' className="form-control" placeholder="Name" />
                </div>
                <div className="form-group col-md-6">
                  <label>Address</label>
                  <input type="text" ref='address' className="form-control" placeholder="Address" />
                </div>
                <div className="form-group col-md-6">
                  <label>Cost</label>
                  <input type="text" ref='cost' className="form-control" placeholder="Cost" />
                </div>
                <div className="form-group col-md-6">
                  <label>Description</label>
                  <input type="text" ref='description' className="form-control" placeholder="Description" />
                </div>
                <div className="form-group col-md-6">
                  <label>Duration</label>
                  <input type="text" ref='duration' className="form-control" placeholder="Duration" />
                </div>
                <div className="form-group col-md-6">
                  <label>Popularity</label>
                  <input type="text" ref='popularity' className="form-control" placeholder="Popularity" />
                </div>
                <div className="form-group col-md-6">
                  <label>Image url</label>
                  <input type="text" ref='image' className="form-control" placeholder="Image" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let cost = this.refs.cost.value;
    let description = this.refs.description.value;
    let duration = this.refs.duration.value;
    let popularity = this.refs.popularity.value;
    let image = this.refs.image.value;
    let uid = this.refs.uid.value;
  
    if (uid && name && address && cost && description && duration && popularity && image){
      const { attractionList } = this.state;
      const devIndex = attractionList.findIndex(data => {
        return data.uid === uid 
      });
      attractionList[devIndex].name = name;
      attractionList[devIndex].address = address;
      attractionList[devIndex].cost = cost;
      attractionList[devIndex].description = description;
      attractionList[devIndex].duration = duration;
      attractionList[devIndex].popularity = popularity;
      attractionList[devIndex].image = image;
      this.setState({ attractionList });
    }
    else if (name && address && cost && description && duration && popularity && image) {
      const uid = new Date().getTime().toString();
      const { attractionList } = this.state;
      attractionList.push({ uid, name, address, cost, description, duration, popularity, image })
      this.setState({ attractionList });
    }
  
    this.refs.name.value = '';
    this.refs.address.value = '';
    this.refs.cost.value = '';
    this.refs.description.value = '';
    this.refs.duration.value = '';
    this.refs.popularity.value = '';
    this.refs.image.value = '';
    this.refs.uid.value = '';
  }
  
  removeData = (attraction) => {
    const { attractionList } = this.state;
    const newState = attractionList.filter(data => {
      return data.uid !== attraction.uid;
    });
    this.setState({ attractionList: newState });
  }
  
  updateData = (attraction) => {
    this.refs.uid.value = attraction.uid;
    this.refs.name.value = attraction.name;
    this.refs.address.value = attraction.address;
    this.refs.cost.value = attraction.cost;
    this.refs.description.value = attraction.description;
    this.refs.duration.value = attraction.duration;
    this.refs.popularity.value = attraction.popularity;
    this.refs.image.value = attraction.image;
  }
    
}
export default Planner;