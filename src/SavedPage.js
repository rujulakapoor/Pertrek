import React, { Component } from 'react';
import {Button, Table, Accordion,Card, Container, Row, Col } from 'react-bootstrap'

import fire from "./config/fire";
import GenerateItinerary from './GenerateItinerary'

class SavedPage extends Component {


  constructor(props){
    super(props);
    this.state = {
      itineraries: [],
      retreived: false,
      user: "",
      startdate: '',
      enddate: '',
      title: '',
      budget: '',
      multiday: '',
      location: '',
      notes: '',
      step: 1,
    }
    this.getItineraries = this.getItineraries.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.editPlan = this.editPlan.bind(this);
  }
// //
// // async componentWillMount() {
// // let thisstate = this;
// //   await fire.auth().onAuthStateChanged( function(user) {
// //       if (user) {
// //         console.log("user is ");
// //         console.log(user);
// //         const fireuser = fire.auth().currentUser.uid;
// //     fire.database().ref('itineraries/' + fireuser
// //   ).on("value", snapshot=> {
// //   thisstate.setState(prevState=>{
// //     itineraries:prevState.itineraries.concat(snapshot.val())
// //
// //   })
//
//   console.log('value is ')
//   console.log(snapshot.val())
//   console.log(thisstate.state.itineraries)
//
//   })
// console.log('done with compondentmount')
// console.log(this.state.itineraries)
//
//     }
//   })
// }

getItineraries() {
if(this.state.retreived === false ){
  const user = fire.auth().currentUser.uid;
  fire.database().ref('itineraries/' + user
  ).on("value", snapshot=> {
    if(snapshot.val()) {
    let currentstate = this;
    console.log("snapshot is ")
    console.log(snapshot.val())

    const values = snapshot.val();
    console.log(values);

    Object.entries(values).map((thing) => {
    console.log("key val is " + thing ) ;
    currentstate.setState( {
      itineraries: [...currentstate.state.itineraries,  thing]
      })
    })
    }
  })

    // console.log(snapshot.val())
    // this.setState( {
    // itineraries: [...this.state.itineraries, snapshot.val()]
  //0})

  this.state.retreived=true;
  }
}

editPlan(itinerary) {
  this.setState({
    startdate: itinerary[1].startdate,
    enddate: itinerary[1].enddate,
    title: itinerary[1].title,
    budget: itinerary[1].budget,
    location: itinerary[1].location,
    notes: itinerary[1].notes,
    step: 2
  })

}
deletePlan(itinerary){


  const user = fire.auth().currentUser.uid;
  fire.database().ref('itineraries/' + user).child(itinerary[0]).remove();

   this.setState({
  itineraries: [],
  retreived: false
  })
  this.getItineraries();


     /*fire.database().ref('itineraries/' + user
  ).on("value", snapshot=> {
    let currentstate = this;
    console.log("snapshot is ")
    console.log(snapshot.val())

    const values = snapshot.val();
    console.log(values);

    Object.entries(values).map((thing) => {
    console.log("key val is " + thing ) ;
    currentstate.setState( {
      itineraries: [...currentstate.state.itineraries,  thing]
      })
    })
  })
  */

}



render(){
  // if(fire.auth().currentUser === null || this.state.itineraries.length ===0) {
  //   console.log("no user");
  //   return null;
  // }
let statenow = this
  fire.auth().onAuthStateChanged( function(user) {
      if (user) {
console.log("HERE")
 statenow.getItineraries();
}})

  console.log("second props");
  console.log(this.state.itineraries);

  switch(this.state.step) {
    case 1:
      return(
        <div>
        <h1> Saved Itineraries Page </h1>

          {Object.entries(this.state.itineraries).map(([key,value]) =>

            <Card key={value[0]} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
            <Card.Header as="h4"> <b>{value[1].title}</b> </Card.Header>
            <Card.Body>
              <Card.Text as="h5">
                Location: {value[1].location}
                </Card.Text>
                <Card.Text as="h7">
                Notes: {value[1].notes}
                </Card.Text>
                <Card.Text> </Card.Text>
                <Button variant="primary" onClick={this.editPlan.bind(this, this.state.itineraries[key])}>Edit </Button>
                <Card.Text> </Card.Text>
                <Button variant="primary" onClick={this.deletePlan.bind(this, this.state.itineraries[key])}>Delete</Button>
              </Card.Body>
              </Card>
              )
          }

        </div>
      );
    case 2:
      return(
        <GenerateItinerary
        values={[this.state.startdate, this.state.enddate, this.state.title, this.state.budget, this.state.location, this.state.notes]}
        />
      );
  }


}
}

export default SavedPage
