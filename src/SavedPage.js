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



  console.log("second props");
  console.log(this.state.itineraries);

  return(
    <div>
    <Button onClick={this.getItineraries}> My Itineraries </Button>
     <h1> Saved Itineraries Page </h1>

      {Object.entries(this.state.itineraries).map(([key,value]) =>
         <h1> {value[1].title}</h1>
        )
      }

</div>
   );

}
}

export default SavedPage
