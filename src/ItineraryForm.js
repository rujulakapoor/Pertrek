import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class ItineraryForm extends Component {
  constructor(props) {
    super(props);
  }
  onNavigateHome(){
    this.props.history.push('/Login');
  }


render() {

  return(
    <div> </div>
  );
}


}
export default ItineraryForm
