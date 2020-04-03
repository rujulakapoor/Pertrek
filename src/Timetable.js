import React, { Component } from 'react';
import {Button, Form, FormControl, FormLabel, FormGroup, Card, Table} from 'react-bootstrap'
export class Timetable extends Component {



constructor(props) {
super(props);
this.state = {
  times: ''
}
this.renderTable =this.renderTable.bind(this)
}


renderTime(time) {
  console.log("this is in render Times")
  console.log(this.state.times)
  var event = this.state.times.scheduleactivities[time.toString()]
console.log("In renderTime")
var size = 0, key;
for (key in event) {
    if (event.hasOwnProperty(key)) size++;
}
 

  if(size != 0){
    console.log(event)
    console.log("Is event")
    return(
      <Card>
        <Card.Body>
          <p> is name  {event.name}</p>
          </Card.Body>
        </Card>
    )

  } else {
    console.log("No activity here")
  }
}
renderTable() {
  if(this.state.times){
    console.log("times is")
     console.log(this.state.times)
return (
  <Table responsive striped bordered variant="dark" width="400" size="sm">

  <thead>
    <tr>
    <th width="15%"> </th>
    <th> </th>
    </tr>
  </thead>

    <tbody>
    <tr>
      <td> 8:00am </td>
      <td> {this.renderTime("08:00")} </td>
    </tr>
    <tr>
      <td> 8:15am </td>
      <td>   </td>
    </tr>
    <tr>
      <td> 8:30am </td>
      <td>   </td>
    </tr>
    <tr>
      <td> 8:45am </td>
      <td>  </td>
    </tr>

        <tr>
      <td> 9:00am </td>
</tr>
<tr>
      <td> 9:15am </td>
</tr>
<tr>
      <td> 9:30am </td>
</tr>
<tr>
      <td> 9:45am </td>
</tr>
  <tr>
    <td> 10:00am </td>
</tr>
<tr>
    <td> 10:15am </td>
</tr>
<tr>
    <td> 10:30am </td>
</tr>
<tr>
    <td> 10:45am </td>
</tr>
  <tr>
    <td> 11:00am </td>
</tr>
<tr>
    <td> 11:15am </td>
</tr>
<tr>
    <td> 11:30am </td>
</tr>
<tr>
    <td> 11:45am </td>
</tr>
  <tr>
    <td> 12:00pm </td>
</tr>
<tr>
    <td> 12:15pm </td>
</tr>
<tr>
    <td> 12:30pm </td>
</tr>
<tr>
    <td> 12:45pm </td>
</tr>
  <tr>
    <td> 1:00pm </td>
  </tr>
  <tr>
    <td> 1:15pm </td>
  </tr>
  <tr>
    <td> 1:30pm </td>
  </tr>
  <tr>
    <td> 1:45pm </td>
  </tr>
      <tr>
   <td> 2:00pm </td>
</tr>
<tr>
   <td> 2:15pm </td>
</tr>
<tr>
   <td> 2:30pm </td>
</tr>
<tr>
   <td> 2:45pm </td>
</tr>
  <tr>
    <td> 3:00pm </td>
</tr>
<tr>
    <td> 3:15pm </td>
</tr>
<tr>
    <td> 3:30pm </td>
</tr>
<tr>
    <td> 3:45pm </td>
</tr>
  <tr>
    <td> 4:00pm </td>
</tr>
<tr>
    <td> 4:15pm </td>
</tr>
<tr>
    <td> 4:30pm </td>
</tr>
<tr>
    <td> 4:45pm </td>
</tr>
  <tr>
    <td> 5:00pm </td>
</tr>
<tr>
    <td> 5:15pm </td>
</tr>
<tr>
    <td> 5:30pm </td>
</tr>
<tr>
    <td> 5:45pm </td>
</tr>

  <tr>
    <td> 6:00pm </td>
</tr>
<tr>
    <td> 6:15pm </td>
</tr>
<tr>
    <td> 6:30pm </td>
</tr>
<tr>
    <td> 6:45pm </td>
</tr>
  <tr>
      <td> 7:00pm </td>
</tr>
<tr>
      <td> 7:15pm </td>
</tr>
<tr>
      <td> 7:30pm </td>
</tr>
<tr>
      <td> 7:45pm </td>
</tr>
  <tr>
    <td> 8:00pm </td>
</tr>
<tr>
    <td> 8:15pm </td>
</tr>
<tr>
    <td> 8:30pm </td>
</tr>
<tr>
    <td> 8:45pm </td>
</tr>
  <tr>
    <td> 9:00pm </td>
</tr>
<tr>
    <td> 9:15pm </td>
</tr>
<tr>
    <td> 9:30pm </td>
</tr>
<tr>
    <td> 9:45pm </td>
</tr>
  <tr>
    <td> 10:00pm </td>
</tr>

  <tr>
    <td> 10:15pm </td>
</tr>

  <tr>
    <td> 10:30pm </td>
</tr>

  <tr>
    <td> 10:45pm </td>
</tr>
  <tr>
    <td> 11:00pm </td>
  </tr>
      <tr>
     </tr>
     </tbody>
</Table>
)
  }
  else {
    return(
    <Table responsive striped  variant="dark" width="400">

    <thead>
      <tr>
      <th width="15%"> </th>
      <th> </th>
      </tr>
    </thead>

      <tbody>
      <tr>
        <td> 8:00am </td>
        <td> <Card> </Card> </td>
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
        <tr>
       </tr>
       </tbody>
</Table>

    );
  }
}

render() {

  if (this.props.times) {
    this.state.times = this.props.times
 
  }
 
  return(
      <div>
    
    {this.renderTable()}

       </div>

  );
}
}
export default Timetable
