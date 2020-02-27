import React, { Component } from 'react';
import {Button, Table, Accordion,Card, Container, Row, Col } from 'react-bootstrap'

import fire from "./config/fire";


class SavedPage extends Component {


  constructor(props){
    super(props);
    this.state = {
      itineraries: [],
      retreived: false,
      user: ""
    }
    this.getItineraries = this.getItineraries.bind(this);
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
    // console.log(snapshot.val())
    // this.setState( {
    // itineraries: [...this.state.itineraries, snapshot.val()]
  //0})

  console.log('DONE GETTING ITINERARIES');
  console.log(this.state.itineraries);
  this.state.retreived=true;
  }
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
          </Card.Body>
          </Card>
          )
      }

</div>
   );

}
}

export default SavedPage
