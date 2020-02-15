import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import kerm from './img/kermit.jpg';
import fire from './config/fire';
import Firebase from 'firebase';
import { FirestoreCollection, FirestoreDocument } from 'react-firestore';

import FirebaseDatabaseNode from 'react-firestore';


class Planner extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      attractions: []
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
    const { attractions } = this.state;
    return(
      <div className="container">
        <div className="row">
          <div className='col-xl-12'>
            <h1>Firebase Development Team</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xl-12'>
          { 
            attractions
            .map(attraction => 
              <div key={attraction.uid} className="card float-left" style={{width: '18rem', marginRight: '1rem'}}>
                <div className="card-body">
                  <h5 className="card-title">{ attraction.name }</h5>
                  <p className="card-text">{ attraction.description }</p>

                </div>
              </div>
              )
          } 
          </div>
        </div>
        
        {/* ^^^^^^^ */}

        <div className='row'>
          <div className='col-xl-12'>
            <h1>Add new team member here</h1>
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
    let uid = this.refs.uid.value;
  
    if (uid && name && address && cost && description && duration && popularity){
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
      this.setState({ attractions });
    }
    else if (name && address && cost && description && duration && popularity ) {
      const uid = new Date().getTime().toString();
      const { attractions } = this.state;
      attractions.push({ uid, name, address, cost, description, duration, popularity })
      this.setState({ attractions });
    }
  
    this.refs.name.value = '';
    this.refs.address.value = '';
    this.refs.cost.value = '';
    this.refs.description.value = '';
    this.refs.duration.value = '';
    this.refs.popularity.value = '';
    this.refs.uid.value = '';
  }
  
  removeData = (attraction) => {
    const { attractions } = this.state;
    const newState = attractions.filter(data => {
      return data.uid !== attraction.uid;
    });
    this.setState({ attractions: newState });
  }
  
  updateData = (attraction) => {
    this.refs.uid.value = attraction.uid;
    this.refs.name.value = attraction.name;
    this.refs.address.value = attraction.address;
    this.refs.cost.value = attraction.cost;
    this.refs.description.value = attraction.description;
    this.refs.duration.value = attraction.duration;
    this.refs.popularity.value = attraction.popularity;
  }

    
}

export default Planner;