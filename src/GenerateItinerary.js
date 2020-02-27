import React, { Component } from 'react';
import {Button, Table, Accordion,Card, Container, Row, Col } from 'react-bootstrap'

import fire from "./config/fire";
export class GenerateItinerary extends Component {

constructor(props){
  super(props);
  this.save= this.save.bind(this);
}

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

    save() {

      const db = fire.firestore();
      const itineraryref = db.collection('itineraries').add({
         notes: this.props.values.notes,
         title: this.props.values.title

       }).then(ref => {
         console.log('Added document with ID: ', ref.id);
       });
       console.log("save completed?" + itineraryref);
       console.log(itineraryref);
    }


  render() {
    const {values, handleChange} = this.props;
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
     <Table striped bordered variant="dark">

          <thead>
            <tr>
            <th width="15%"> </th>
              <th> {values.startdate} </th>
              <th>  </th>
              <th> {values.enddate} </th>
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
