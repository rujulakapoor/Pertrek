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
      costc: '',
      partysize: '',
      itkey: '',
      dailydata: [],
      numdays: 0,
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
    partysize: itinerary[1].partysize,
    orange: itinerary[1].orange,
    yellow: itinerary[1].yellow,
    green: itinerary[1].green,
    black: itinerary[1].black,
    purple: itinerary[1].purple,
    maroon: itinerary[1].maroon,
    blue: itinerary[1].blue,
    times: itinerary[1].times,
    arial: itinerary[1].arial,
    quicksand: itinerary[1].quicksand,
    comic: itinerary[1].comic,
    size1: itinerary[1].size1,
    size2: itinerary[1].size2,
    size3: itinerary[1].size3,
    dailydata: itinerary[1].dailydata,
    numdays: itinerary[1].numdays,
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

  const {startdate, enddate, numdays, location, title, budget, notes,Plate,CostH,HName,costcc,plane1n,plane1d,plane1t,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf,partysize, orange,yellow,green,black,purple,maroon,blue,times,arial,quicksand,comic,size1,size2,size3,dailydata, itkey} = this.state;
  const values = {startdate, enddate, numdays, title, budget, location, notes, Plate,CostH,HName,costcc,plane1n,plane1d,plane1t,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf,partysize, orange,yellow,green,black,purple,maroon,blue,times,arial,quicksand,comic,size1,size2,size3,dailydata,itkey}
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
        <Jumbotron style={{ textDecoration: 'none',background:'#FF5E5B', color:'white'}}>
          <h1> My Itineraries </h1>
        </Jumbotron>

          {Object.entries(this.state.itineraries).map(([key,value]) =>

            <Card key={value[0]} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
            <Card.Header as="h4" style={{ textDecoration: 'none',background:'#FF5E5B', color:'white'}}> <b>{value[1].title}</b> </Card.Header>
            <Card.Body>
              <Card.Text as="h5">
                Location: {value[1].location}
                </Card.Text>
                <Card.Text as="h7">
                Notes: {value[1].notes}
                </Card.Text>
                <Card.Text> </Card.Text>
                <Button style={{ textDecoration: 'none',background:'#FF5E5B', color:'white'}} variant="primary" onClick={this.editPlan.bind(this, this.state.itineraries[key])}>Edit </Button>
                <Card.Text> </Card.Text>
                <Button style={{ textDecoration: 'none',background:'#FF5E5B', color:'white'}} variant="primary" onClick={this.deletePlan.bind(this, this.state.itineraries[key])}>Delete</Button>
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
