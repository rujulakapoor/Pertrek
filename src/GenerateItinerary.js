import React, { Component } from 'react';
import {Button, Table, Accordion,Card} from 'react-bootstrap'
export class GenerateItinerary extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    const {values, handleChange} = this.props;
   return(
<div>
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

     <Table striped bordered variant="dark">

          <thead>
            <tr>
              <th> {values.startdate} </th>
              <th> </th>
              <th> {values.enddate} </th>
            </tr>
          </thead>
          <tbody>
          <tr>
          </tr>

          </tbody>
     </Table>
     </div>

   );

  }
}
export default GenerateItinerary;
