import React, { Component } from 'react';
import {Button, Form, FormControl, FormLabel, FormGroup, Card, ProgressBar, Badge, Table} from 'react-bootstrap'

import {FiEdit2, FiSave} from 'react-icons/fi'

export class Timetable extends Component {


constructor(props) {
super(props);
this.state = {
  times: '',
  budget: 0,
  dailybudget:0,
  editBudget: false
}
this.renderTable =this.renderTable.bind(this)
this.renderEdit = this.renderEdit.bind(this)
this.renderCostBar = this.renderCostBar.bind(this)
this.changeBudget = this.changeBudget.bind(this)
this.renderBudgetEdit = this.renderBudgetEdit.bind(this)
this.renderDailyBudget = this.renderDailyBudget.bind(this)
this.handleChange = this.handleChange.bind(this)
}

renderEdit(event) {

  if(event.isfirst) {
    
    
    return(
      <Button variant="info"> <FiEdit2 /> </Button>
    )
  }
}

handleChange = input => e => {
 
  this.setState({[input]: e.target.value})
this.state.dailybudget = e.target.value 
this.props.newbudget(e.target.value)
}

renderDailyBudget() {

  if(this.state.editBudget) {
    return((<input type="number" placeholder={this.state.dailybudget} onChange={this.handleChange('dailybudget')}/>)
    ) 
  } else {
    return(
      <h4>Daily Budget is: ${this.state.dailybudget}</h4>
    )
  }

}

renderBudgetEdit() {
   
  if(this.state.editBudget) {
  return(      <Button variant="light" onClick={this.changeBudget}>
       <FiSave />
       </Button>
  )
  } else {
    return(      <Button variant="light" onClick={this.changeBudget}>
         <FiEdit2 />
         </Button>
  )
  }


}


changeBudget() {
  if(this.state.editBudget === false) {
    this.setState({
      editBudget:true
    })
  } else if(this.state.editBudget === true) {
    this.props.newbudget(this.state.dailybudget)
    this.setState({
      editBudget:false,
    })
   

  }
}
renderCostBar() {
 
  var percentCost = 0;
  let badge = <Badge variant="info" > You Are Under Budget!</Badge>
  var travelCost = 0;

  if(this.state.budget != 0) {
    if(this.state.times){

      percentCost = this.state.times.cost  / this.state.dailybudget;
      percentCost *= 100
      percentCost = Math.round(percentCost)
      if(percentCost > 100) {
        percentCost = 100; 
        badge = <Badge variant="danger" > You Are Over Budget</Badge>
      }
      if(this.props.travel) {
        travelCost = this.props.travel / this.state.dailybudget;
        travelCost *= 100
        travelCost = Math.round(travelCost)
        if(travelCost > 100) {
          travelCost = 100
          badge = <Badge variant="danger" > You Are Over Budget</Badge>

        }

      }
      if(travelCost + percentCost > 100) {
        badge = <Badge variant="danger" > You Are Over Budget</Badge>

      }

 
    } 
  }

  var costtotal = this.state.times.cost 
  if(this.props.travel) {
    costtotal += parseInt(this.props.travel)
  }
  return(
    <div>
      <h2> Current Cost : ${costtotal} </h2>
      { badge }
      <ProgressBar>
      <ProgressBar variant="success" now={percentCost} key={1} label={`${percentCost}%`} />
      
      <ProgressBar variant="warning" now={travelCost} key={2} label={`${travelCost}%`} />
      </ProgressBar>
    </div>
  )


}
renderTime(time) {

  var event = this.state.times.scheduleactivities[time.toString()]

  var activity = event.eventdetails;


  var size = 0, key;
  for (key in activity) {
      if (activity.hasOwnProperty(key)) size++;
  }

  if(size != 0){
    
    return(
      <p> {activity.name} {this.renderEdit(event)} </p>
    )

  }  
}
renderTable() {
  if(this.state.times){
   
return (
  <div>
    {this.renderDailyBudget()}
    {this.renderBudgetEdit()}
    {this.renderCostBar()}
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
      <td> {this.renderTime("08:15")} </td>
    </tr>
    <tr>
      <td> 8:30am </td>
        <td> {this.renderTime("08:30")} </td>   
    </tr>
    <tr>
      <td> 8:45am </td>
        <td> {this.renderTime("08:45")} </td>
    </tr>

        <tr>
      <td> 9:00am </td>  <td> {this.renderTime("09:00")} </td>
</tr>
<tr>
      <td> 9:15am </td>  <td> {this.renderTime("09:15")} </td>
</tr>
<tr>
      <td> 9:30am </td>  <td> {this.renderTime("09:30")} </td>
</tr>
<tr>
      <td> 9:45am </td>  <td> {this.renderTime("09:45")} </td>
</tr>
  <tr>
    <td> 10:00am </td>  <td> {this.renderTime("10:00")} </td>
</tr>
<tr>
    <td> 10:15am </td>  <td> {this.renderTime("10:15")} </td>
</tr>
<tr>
    <td> 10:30am </td>  <td> {this.renderTime("10:30")} </td>
</tr>
<tr>
    <td> 10:45am </td>  <td> {this.renderTime("10:45")} </td>
</tr>
  <tr>
    <td> 11:00am </td>  <td> {this.renderTime("11:00")} </td>
</tr>
<tr>
    <td> 11:15am </td>  <td> {this.renderTime("11:15")} </td>
</tr>
<tr>
    <td> 11:30am </td>  <td> {this.renderTime("11:30")} </td>
</tr>
<tr>
    <td> 11:45am </td>  <td> {this.renderTime("11:45")} </td>
</tr>
  <tr>
    <td> 12:00pm </td>  <td> {this.renderTime("12:00")} </td>
</tr>
<tr>
    <td> 12:15pm </td>  <td> {this.renderTime("12:15")} </td>
</tr>
<tr>
    <td> 12:30pm </td>  <td> {this.renderTime("12:30")} </td>
</tr>
<tr>
    <td> 12:45pm </td>  <td> {this.renderTime("12:45")} </td>
</tr>
  <tr>
    <td> 1:00pm </td>  <td> {this.renderTime("13:00")} </td>
  </tr>
  <tr>
    <td> 1:15pm </td>  <td> {this.renderTime("13:15")} </td>
  </tr>
  <tr>
    <td> 1:30pm </td>  <td> {this.renderTime("13:30")} </td>
  </tr>
  <tr>
    <td> 1:45pm </td>  <td> {this.renderTime("13:45")} </td>
  </tr>
      <tr>
   <td> 2:00pm </td>  <td> {this.renderTime("14:00")} </td>
</tr>
<tr>
   <td> 2:15pm </td>  <td> {this.renderTime("14:15")} </td>
</tr>
<tr>
   <td> 2:30pm </td>  <td> {this.renderTime("14:30")} </td>
</tr>
<tr>
   <td> 2:45pm </td>  <td> {this.renderTime("14:45")} </td>
</tr>
  <tr>
    <td> 3:00pm </td>  <td> {this.renderTime("15:00")} </td>
</tr>
<tr>
    <td> 3:15pm </td>  <td> {this.renderTime("15:15")} </td>
</tr>
<tr>
    <td> 3:30pm </td>  <td> {this.renderTime("15:30")} </td>
</tr>
<tr>
    <td> 3:45pm </td>  <td> {this.renderTime("15:45")} </td>
</tr>
  <tr>
    <td> 4:00pm </td>  <td> {this.renderTime("16:00")} </td>
</tr>
<tr>
    <td> 4:15pm </td>  <td> {this.renderTime("16:15")} </td>
</tr>
<tr>
    <td> 4:30pm </td>  <td> {this.renderTime("16:30")} </td>
</tr>
<tr>
    <td> 4:45pm </td>  <td> {this.renderTime("16:45")} </td>
</tr>
  <tr>
    <td> 5:00pm </td>  <td> {this.renderTime("17:00")} </td>
</tr>
<tr>
    <td> 5:15pm </td>  <td> {this.renderTime("17:15")} </td>
</tr>
<tr>
    <td> 5:30pm </td>  <td> {this.renderTime("17:30")} </td>
</tr>
<tr>
    <td> 5:45pm </td>  <td> {this.renderTime("17:45")} </td>
</tr>

  <tr>
    <td> 6:00pm </td>  <td> {this.renderTime("18:00")} </td>
</tr>
<tr>
    <td> 6:15pm </td>  <td> {this.renderTime("18:15")} </td>
</tr>
<tr>
    <td> 6:30pm </td>  <td> {this.renderTime("18:30")} </td>
</tr>
<tr>
    <td> 6:45pm </td>  <td> {this.renderTime("18:45")} </td>
</tr>
  <tr>
      <td> 7:00pm </td>  <td> {this.renderTime("19:00")} </td>
</tr>
<tr>
      <td> 7:15pm </td>  <td> {this.renderTime("19:15")} </td>
</tr>
<tr>
      <td> 7:30pm </td>  <td> {this.renderTime("19:30")} </td>
</tr>
<tr>
      <td> 7:45pm </td>  <td> {this.renderTime("19:45")} </td>
</tr>
  <tr>
    <td> 8:00pm </td>  <td> {this.renderTime("20:00")} </td>
</tr>
<tr>
    <td> 8:15pm </td>  <td> {this.renderTime("20:15")} </td>
</tr>
<tr>
    <td> 8:30pm </td>  <td> {this.renderTime("20:30")} </td>
</tr>
<tr>
    <td> 8:45pm </td>  <td> {this.renderTime("20:45")} </td>
</tr>
  <tr>
    <td> 9:00pm </td>  <td> {this.renderTime("21:00")} </td>
</tr>
<tr>
    <td> 9:15pm </td>  <td> {this.renderTime("21:15")} </td>
</tr>
<tr>
    <td> 9:30pm </td>  <td> {this.renderTime("21:30")} </td>
</tr>
<tr>
    <td> 9:45pm </td>  <td> {this.renderTime("21:45")} </td>
</tr>
  <tr>
    <td> 10:00pm </td>  <td> {this.renderTime("22:00")} </td>
</tr>

  <tr>
    <td> 10:15pm </td>  <td> {this.renderTime("22:15")} </td>
</tr>

  <tr>
    <td> 10:30pm </td>  <td> {this.renderTime("22:30")} </td>
</tr>

  <tr>
    <td> 10:45pm </td>  <td> {this.renderTime("22:45")} </td>
</tr>
  <tr>
    <td> 11:00pm </td>  <td> {this.renderTime("23:00")} </td>
  </tr>
      <tr>
     </tr>
     </tbody>
</Table>
</div>
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
        <td>  </td>
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
  if(this.props.budget) { 
    this.state.budget = this.props.budget;
    if(this.props.days){
      this.state.dailybudget = this.state.budget / this.props.days
      this.state.dailybudget = Math.round(this.state.dailybudget)
      console.log("num days is" + this.props.days)

    }
  }
 
  return(
      <div>
    
    {this.renderTable()}

       </div>

  );
}
}
export default Timetable
