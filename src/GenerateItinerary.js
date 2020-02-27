import React, { Component } from 'react';
import {Button, Table, Accordion,Card, Container, Row, Col } from 'react-bootstrap'

import fire from "./config/fire";
export class GenerateItinerary extends Component {

constructor(props){
  super(props);
  this.save= this.save.bind(this);
  this.state = {
    days: [],
    alreadysaved: false
  }
}

componentWillMount() {
  console.log(this.props.values.enddate)
  const end=new Date(this.props.values.enddate);
  end.setDate(end.getDate() + 1)
  const start = new Date(this.props.values.startdate);
  start.setDate(start.getDate() + 1);


  console.log(this.props.values.startdate);
  console.log(start)
  console.log(end)
  console.log("is enddate");
  let len = 1
  for( var d = start; d <= end ; d.setDate(d.getDate() + 1))
  {
    this.state.days.push(new Date(d));
    console.log(this.state.days)
    if(len++ > 30) {
      break
    }
  }

}

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

    save() {
if(this.state.alreadysaved == false){
      const user = fire.auth().currentUser.uid
      console.log(user);
      const db = fire.database().ref('itineraries/' + user);
      const item = {
        notes: this.props.values.notes,
        title: this.props.values.title,
        location: this.props.values.location,
        startdate: this.props.values.startdate,
        enddate: this.props.values.enddate,
        budget: this.props.values.budget
      }


        db.push(item
        ).then(ref => {
         console.log('Added document with ID: ', ref.id);
       });
       console.log("save completed?" + item);
       console.log(item);
       this.setState({
         alreadysaved: true
       })
    }
    else {
      console.log("Already saved")

    }

  }




  render() {


    const {values, handleChange} = this.props;
    console.log(this.state.days);

   return(
  <div id="form">
    <h2> {values.title} </h2>


    <Container>
    <Row>
    <Col>
    <h2> {values.location} Trip</h2>
    </Col>
    <Col>

     </Col>
     <Col>
     <h2> Budget: ${values.budget}</h2>
</Col>
    </Row>
    <Row>
    <Col></Col>
    <Col></Col>
    <Col>
    <Accordion defaultActiveKey="1">
     <Card>
       <Accordion.Toggle as={Card.Header} eventKey="0">
       Notes
       </Accordion.Toggle>
       <Accordion.Collapse eventKey="0">
         <Card.Body>{values.notes}</Card.Body>
       </Accordion.Collapse>
     </Card>
    </Accordion>
    </Col>
    </Row>
    </Container>
     <Table responsive striped bordered variant="dark" width="400">
          <thead>
            <tr>
            <th width="15%"> </th>
            {
              this.state.days.map((day) =>

            <th width="200">{day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()}</th>)
            }

            </tr>
          </thead>
          <tbody>
          <tr>
            <td> 8:00am </td>
          </tr>
          <tr>
            <td> 9:00am </td>
          </tr>
          <tr>
            <td> 10:00am </td>
          </tr>
          <tr>
            <td> 11:00am </td>
          </tr>
          <tr>
            <td> 12:00pm </td>
          </tr>
          <tr>
            <td> 1:00pm </td>
          </tr>
          <tr>
            <td> 2:00pm </td>
          </tr>
          <tr>
            <td> 3:00pm </td>
          </tr>
          <tr>
            <td> 4:00pm </td>
          </tr>
          <tr>
            <td> 5:00pm </td>
          </tr>
          <tr>
            <td> 6:00pm </td>
          </tr>
          <tr>
            <td> 7:00pm </td>
          </tr>
          <tr>
            <td> 8:00pm </td>
          </tr>
          <tr>
            <td> 9:00pm </td>
          </tr>
          <tr>
            <td> 10:00pm </td>
          </tr>
          <tr>
            <td> 11:00pm </td>
          </tr>
      </tbody>
     </Table>
     <h2> Suggested Attractions </h2>
     <Button onClick={this.save}> Save </Button>
     </div>


   );

  }
}
export default GenerateItinerary;
