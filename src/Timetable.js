// import React, {Component} from 'react'
// import Example from './ItineraryTimetable/Example'
// import { DndProvider } from 'react-dnd'
// import Backend from 'react-dnd-html5-backend'

// import ScheduleBasic from './ItineraryTimetable/ScheduleBasic'

// export class Timetable extends Component {

//   constructor (props) {
//     super(props) 
//   }
//   render() {
//     return (
//       <div className="App">
//         <DndProvider backend={Backend}>
//           <ScheduleBasic snapToGrid='true' />
//         </DndProvider>
//       </div>
//     )
//     }

// }

// export default Timetable



import React, { Component } from 'react';
import {Button, Form, FormControl, FormLabel, FormGroup, Table} from 'react-bootstrap'
 
export class Timetable extends Component {


constructor(props) {

  super(props);
}

render() {
  return(
      <div>
    <Table responsive striped bordered variant="dark" width="400">

    <thead>
      <tr>
      <th width="15%"> </th>
      <th> </th>
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
        <tr>
       </tr>
       </tbody>
</Table>
       </div>

  );
}
}
export default Timetable
