import React, { Component } from 'react';
import {Button, Table, Jumbotron, Accordion,Card, Container, Row, Col } from 'react-bootstrap'

import fire from "./config/fire";
import GenerateItinerary from './GenerateItinerary'
import RentalCar from './RentalCar'
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

      schedule: [],

      costc: '',

      itkey: '',
      step: 1,
    }
    this.getItineraries = this.getItineraries.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.editPlan = this.editPlan.bind(this);
  }

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

    schedule: itinerary[1].schedule ? itinerary[1].schedule : [],

    costc: itinerary[1].costc,
    Plate: itinerary[1].Plate,
    CostH: itinerary[1].CostH,
    HName: itinerary[1].HName,
    costcc: itinerary[1].costcc,
    plane1n: itinerary[1].plane1n,
    plane1d: itinerary[1].plane1d,
    plane1t: itinerary[1].plane1t,
    plane2n: itinerary[1].plane2n,
    plane2d: itinerary[1].plane2d,
    plane2t: itinerary[1].plane2t,
    plane3n: itinerary[1].plane3n,
    plane3d: itinerary[1].plane3d,
    plane3t: itinerary[1].plane3t,
    countf: itinerary[1].countf,

    itkey: itinerary[0],
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

}



render(){



  // if(fire.auth().currentUser === null || this.state.itineraries.length ===0) {
  //   console.log("no user");
  //   return null;
  // }

  const {startdate, enddate, location, title, budget, notes,Plate,CostH,HName,costcc,plane1n,plane1d,plane1t,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf, itkey} = this.state;
  const values = {startdate, enddate, title, budget, location, notes, Plate,CostH,HName,costcc,plane1n,plane1d,plane1t,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf, itkey}
let statenow = this

  fire.auth().onAuthStateChanged( function(user) {
      if (user) {
      statenow.getItineraries();
}})
 

  switch(this.state.step) {
    case 1:
      return(
        <div>
        <Jumbotron>
          <h1> My Itineraries </h1>
        </Jumbotron>

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
        <div>
    
        <GenerateItinerary

        values={values}
        
        />
        
       
        
        </div>
      );
  }


}
}

export default SavedPage
