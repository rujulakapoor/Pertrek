import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import fire from './config/fire';
import Firebase from 'firebase';

class Planner extends Component {
  constructor(props) {
    super(props);
    //console.log("URL = " + window.location.href);
    var url = window.location.href;
    var cityName = url.substring(url.lastIndexOf("/")+1, url.length);
    //cityName = "attractions"
    console.log("cityName = " + cityName);
    var f = {address:"hol up", city:"hol up", cost:"hol up", description:"hol up", duration:"hol up", image:"hol up", name:"hol up",popularity:"hol up",uid:"1582389361380"};
    var arr = [];
    arr.push(f);


    this.state = {
      attractions: [], //COLLECTION NAME
      attractionList: arr,
      citySelect: cityName
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

    var ref = Firebase.database().ref('/');
    ref
      //.child('')
      //.orderByChild("name")
      //.equalTo("a")
      .on('value', snapshot => {
        const state = snapshot.val();
        console.log("state key = " + snapshot.key);
        this.setState(state);
    });

    console.log('DATA RETRIEVED');
        
  }
  componentDidMount() {
    this.getUserData();
    //this.removeAttractions(this.state.attractions, "Chicago,IL");

    //const { dbName } = this.props.location.state;
  }
  filterAttractions() {
    console.log("filtering with array length " + this.state.attractions.length);
    console.log("attraction name = " + this.state.attractions.name);

    for(let i = 0; i < this.state.attractions.length; i++) {
      console.log("ass");
    }

    this.state.attractions.reduce(function(result, element) {
      console.log("name = " + element.name)
      if(element.name == "a") {
        result.push(element);
      }
      return result;
    }, []);
  }
  removeAttractions(arr, str) {
    console.log("array length = " + arr.length);
    console.log("attractions state = " + this.state.attractions);
    for(var prop in this.state.attractions){
      console.log("life sucks " + this.state.attractions[prop].address);
    }
    if(arr.length != 0) {
      for(let i = 0; i < arr.length; i++) {
        //console.log("i = " + i + " ending at " + arr.length);
        console.log("comparing " + arr[i].name);
        if(arr[i].city !== str) { //DOES NOT EQUAL
          //console.log("removing " + arr[i].city);

          arr.splice(i, 1);
          i--;
        }
      }
    }
    
    
  }
  addAttractions(arr) {
    console.log("ADDING ATTRACTION");
    for(var a in this.state.attractions){
      var obj = this.state.attractions[a];
      var attraction = {address:obj.address, city:obj.city, cost:obj.cost, description:obj.description, duration:obj.duration, image:obj.image, name:obj.name,popularity:obj.popularity, uid:obj.uid};
      //console.log("life sucks " + this.state.attractions[a].address);
      this.state.attractionList.push(attraction);
    }

    for(var i = 0; i < this.state.attractionList.length; i++) {
      console.log("attraction " + i + " name = " + this.state.attractionList[i].name);
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log("update");
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  render() {
    const { attractions } = this.state; //COLLECTION NAME
    return(

      <div className="planner">
        <div className="row">
          <div className='col-xl-12'>
            <h1>Attractions</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
            {
              console.log("state length = " + this.state.attractions.length)
            }
            {
              //this.removeAttractions(this.state.attractions, this.state.citySelect)
              //this.addAttractions(this.state.attractions)
            }
          {  

            attractions //COLLECTION NAME
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
    console.log("submitting");
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
      console.log("submit 1");
      const { attractions } = this.state;
      const devIndex = attractions.findIndex(data => {
        return data.uid === uid 
      });
      attractions[devIndex].name = name;
      attractions[devIndex].address = address;
      attractions[devIndex].cost = cost;
      attractions[devIndex].description = description;
      attractions[devIndex].duration = duration;
      attractions[devIndex].popularity = popularity;
      attractions[devIndex].image = image;
      this.setState({ attractions });
    }
    else if (name && address && cost && description && duration && popularity && image) {
      console.log("submit 2");
      const uid = new Date().getTime().toString();
      const { attractions } = this.state;
      attractions.push({ uid, name, address, cost, description, duration, popularity, image })
      this.setState({ attractions });
    }
  
    // this.refs.name.value = '';
    // this.refs.address.value = '';
    // this.refs.cost.value = '';
    // this.refs.description.value = '';
    // this.refs.duration.value = '';
    // this.refs.popularity.value = '';
    // this.refs.image.value = '';
    // this.refs.uid.value = '';

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