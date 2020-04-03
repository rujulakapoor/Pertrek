import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import FormItineraryDetails from './FormItineraryDetails'
import GenerateItinerary from './GenerateItinerary'
import RentalCar from './RentalCar'
class ItineraryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      startdate: '',
      enddate: '',
      title: '',
      budget: '',
      multiday: '',
      location: '',
      notes: '',
      Plate: '',
      CostH: '',
      HName: '',
      costcc: '',
      plane1n: '',
      plane1d: '',
      plane1t: '',
      plane2n: '',
      plane2d: '',
      plane2t: '',
      plane3n: '',
      plane3d: '',
      plane3t: '',
      countf: '',
      partysize: ''
    };
  }
  onNavigateHome(){
    this.props.history.push('/Login');
  }

//Proceed to next step
nextStep = () => {
  const {step} = this.state;
  this.setState({
    step: step + 1
  })
}

// Handle fields change
handleChange = input => e => {
  this.setState({[input]: e.target.value})


}
render() {
  const {step } = this.state;
  const {startdate, enddate, title, budget, multiday, location,notes, Plate,CostH,HName,costcc,plane1n,plane1d,plane1t,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf,partysize} = this.state;
  let itkey = null
  const values = {startdate, enddate, title, budget, multiday, location, notes, Plate,CostH,HName,costcc,plane1n,plane1d,plane1t, plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf,partysize,itkey}
  switch(step) {
    case 1 :
    return(
      <FormItineraryDetails
        nextStep={this.nextStep}
        handleChange={this.handleChange}
        values={values}
      />
    );
    case 2:
      return(
        <div>
        <GenerateItinerary
        nextStep={this.nextStep}
        handleChange={this.handleChange}
        values={values}
        />
        <RentalCar
        nextStep={this.nextStep}
        handleChange={this.handleChange}
        values={values}
        />
        </div>
      );

    case 3:
      return <h2> Confirm </h2>
    case 4:
      return <h2> NewItinerary Here</h2>


  }
  return(
    <div> </div>
  );
}


}
export default ItineraryForm
