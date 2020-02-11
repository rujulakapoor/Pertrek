import React, { Component } from 'react';

export class FormItineraryDetails extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

render() {
  const {values} = this.props;

  return(
    <form>
        <label>Vacation Title  <br/>
        <input type="text" name="title" />
        </label>
        <label>Vacation Start Date  <br/>
        <input type="date" name="startdate" />
        </label>
        <label>Vacation End Date  <br/>
        <input type="date" name="enddate" />
        </label>
        <label>Budget  <br/>
        <input type="double" name="startdate" />
        </label>
    </form>

  );

}

}
export default FormItineraryDetails;
