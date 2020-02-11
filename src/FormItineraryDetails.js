import React, { Component } from 'react';
import {Button, Form, FormControl, FormLabel, FormGroup} from 'react-bootstrap'
export class FormItineraryDetails extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

render() {
  const {values, handleChange} = this.props;

  return(
<div id="form">
    <Form>
      <FormGroup>
        <FormLabel> Vacation Title </FormLabel>
        <FormControl type="text" onChange={handleChange('title')}
        defaultValue={values.title} />
      </FormGroup>
      <FormGroup>
        <FormLabel>Start Date </FormLabel>
        <FormControl type="date"onChange={handleChange('startdate')}
        defaultValue={values.startdate}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> End Date</FormLabel>
        <FormControl type="date"onChange={handleChange('enddate')}
        defaultValue={values.enddate}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Budget </FormLabel>
        <FormControl type="double" onChange={handleChange('budget')}
        defaultValue={values.budget}/>
      </FormGroup>
      <FormGroup>
        <FormLabel>Notes </FormLabel>
        <FormControl type="text"onChange={handleChange('notes')}
        defaultValue={values.notes}/>
      </FormGroup>
      <Button variant="primary" type="submit" onClick={this.continue}>
      Submit
      </Button>
    </Form>

</div>

  );

}

}
export default FormItineraryDetails;
