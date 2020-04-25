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
        <FormLabel> Location </FormLabel>
        <FormControl type="text" onChange={handleChange('location')} defaultValue={values.location}>

        </FormControl>
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
        <FormLabel> Party Size </FormLabel>
        <FormControl type="double" onChange={handleChange('partysize')}
        defaultValue={values.partysize}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Maximum Distance </FormLabel>
        <FormControl type="double" onChange={handleChange('maxdist')}
        defaultValue={values.maxdist}/>
      </FormGroup>
      <FormGroup>
        <FormLabel>Notes </FormLabel>
        <FormControl type="text"onChange={handleChange('notes')}
        defaultValue={values.notes}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Rental Car Cost </FormLabel>
        <FormControl type="text"onChange={handleChange('costcc')}
        defaultValue={values.costcc}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Rental Car Plate Number </FormLabel>
        <FormControl type="text"onChange={handleChange('Plate')}
        defaultValue={values.Plate}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Hotel Name </FormLabel>
        <FormControl type="text"onChange={handleChange('HName')}
        defaultValue={values.HName}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Hotel Cost </FormLabel>
        <FormControl type="text"onChange={handleChange('CostH')}
        defaultValue={values.CostH}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Number of Flights </FormLabel>
        <FormControl type="double"onChange={handleChange('countf')}
        defaultValue={values.countf}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 1 Name </FormLabel>
        <FormControl type="text"onChange={handleChange('plane1n')}
        defaultValue={values.plane1n}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 1 Date </FormLabel>
        <FormControl type="date"onChange={handleChange('plane1d')}
        defaultValue={values.plane1d}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 1 Time </FormLabel>
        <FormControl type="time"onChange={handleChange('plane1t')}
        defaultValue={values.plane1t}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 2 Name </FormLabel>
        <FormControl type="text"onChange={handleChange('plane2n')}
        defaultValue={values.plane2n}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 2 Date </FormLabel>
        <FormControl type="date"onChange={handleChange('plane2d')}
        defaultValue={values.plane2d}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 2 Time </FormLabel>
        <FormControl type="time"onChange={handleChange('plane2t')}
        defaultValue={values.plane2t}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 3 Name </FormLabel>
        <FormControl type="text"onChange={handleChange('plane3n')}
        defaultValue={values.plane3n}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 3 Date </FormLabel>
        <FormControl type="date"onChange={handleChange('plane3d')}
        defaultValue={values.plane3d}/>
      </FormGroup>
      <FormGroup>
        <FormLabel> Plane 3 Time </FormLabel>
        <FormControl type="time"onChange={handleChange('plane3t')}
        defaultValue={values.plane3t}/>
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
