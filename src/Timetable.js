import React, { Component } from 'react';
import {Button, Form, FormControl, FormLabel, FormGroup, Card, ProgressBar, Badge, Table, OverlayTrigger, Tooltip} from 'react-bootstrap'

import {FiEdit2, FiSave} from 'react-icons/fi'
import {TiDeleteOutline} from 'react-icons/ti'
import './Timetable.css'

export class Timetable extends Component {


constructor(props) {
super(props);
this.state = {
  times: '',
  budget: 0,
  dailybudget:0,
  editBudget: false,
  daynum: 0,
  wakeup : 480,
  sleep: 1380
}
this.renderTable =this.renderTable.bind(this)
this.renderEdit = this.renderEdit.bind(this)
this.renderCostBar = this.renderCostBar.bind(this)
this.changeBudget = this.changeBudget.bind(this)
this.renderBudgetEdit = this.renderBudgetEdit.bind(this)
this.renderDailyBudget = this.renderDailyBudget.bind(this)
this.handleChange = this.handleChange.bind(this)
this.deleteEvent = this.deleteEvent.bind(this)
this.setTimes = this.setTimes.bind(this)
}

renderEdit(time, event) {

  if(event.isfirst) {
    
 
  var activity = event.eventdetails;    
    return(
      <h4>
      {activity.name} {this.renderCost(event)}
      <Button className="cancel-event" onClick={() => this.deleteEvent(time,event)}> <TiDeleteOutline /> </Button>
      </h4>
    )
  }
  else{
    var activity = event.eventdetails;
    return(

      <h4>{activity.name}</h4>
    )
  }
}
renderCost(activity) {
  console.log(activity)
  if(activity.cost != null) {
    return(<> Cost: ${activity.cost} </>)
  }
}

deleteEvent(time,event) {
console.log("In Delete Event")
      this.props.delete(time,event, this.state.daynum)

console.log("time")
console.log(this.props.times)

this.setState({
  times: this.props.times
})
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
  var foodCost = 0;
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
      if(this.props.food) {
        foodCost = this.props.food / this.state.dailybudget;
        foodCost *= 100
        foodCost = Math.round(foodCost)
        if(travelCost > 100) {
          travelCost = 100
          badge = <Badge variant="danger" > You Are Over Budget</Badge>

        }

      }
      if(travelCost + percentCost + foodCost> 100) {
        badge = <Badge variant="danger" > You Are Over Budget</Badge>

      }

 
    } 
  }

  var costtotal = this.state.times.cost 
  if(this.props.travel) {
    costtotal += parseInt(this.props.travel)
  }
  if(this.props.food) {
    costtotal += parseInt(this.props.food)
  }
  return(
    <div>
      <h2> Current Cost : ${costtotal} </h2>
      { badge }
      <ProgressBar className="progress-bar-costs">
      <ProgressBar variant="success" now={percentCost} key={1} label={`${percentCost}%`} />
      <ProgressBar className="progress-bar-food" now={foodCost} key={3} label={`${foodCost}%`} />

      <ProgressBar variant="warning" now={travelCost} key={2} label={`${travelCost}%`} />
      </ProgressBar>
    </div>
  )


}
renderTime(time) {

  var event = this.state.times.scheduleactivities[time.toString()]
  var activity = event.eventdetails;
  var minutes = parseInt(time.substring(0,2)) * 60 + parseInt(time.substring(3))
  console.log("minutes is" + minutes )
  console.log("State is "+this.state.sleep + "  " + this.state.wakeup)
  if(minutes > this.state.sleep || minutes < this.state.wakeup) {
    console.log(" PRE WAKEUP DETECTEd " + this.props.times.wakeup + " for time " + time)

    return;
  }

  var size = 0, key;
  for (key in activity) {
      if (activity.hasOwnProperty(key)) size++;
  }

  if(size != 0){
    
      return(
        //Change this to be the modal
        <tr>
          <td>{time} </td>
          <td>
  <OverlayTrigger
    key={time}
    placement='top'
    overlay={
      <Tooltip id={`tooltip-${time}`}>
        Notes: {event.notes} <br/>
        Cost: {event.cost}
      </Tooltip>
    }>
        <Card className="card-tabletop"> {this.renderEdit(time, event)}  </Card>
        </OverlayTrigger>
        </td>
        </tr>

      )

  } else {
    return(
      <tr>
      <td> {time} </td>
      <td>  </td>
      </tr>

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
  <Table  striped borderless variant="itinerary" width="250" size="sm">

  <thead>
    <tr>
    <th width="15%"> </th>
    <th> </th>
    </tr>
  </thead>

    <tbody>
    {/* {this.renderTime("00:00")}
    {this.renderTime("00:15")}
    {this.renderTime("00:30")}
    {this.renderTime("00:45")}
    {this.renderTime("01:00")}
    {this.renderTime("01:15")}
    {this.renderTime("01:30")}
    {this.renderTime("01:45")}
    {this.renderTime("02:00")}
    {this.renderTime("02:15")}
    {this.renderTime("02:30")}
    {this.renderTime("02:45")}
    {this.renderTime("03:00")}
    {this.renderTime("03:15")}
    {this.renderTime("03:30")}
    {this.renderTime("03:45")}
    {this.renderTime("04:00")}
    {this.renderTime("04:15")}
    {this.renderTime("04:30")}
    {this.renderTime("04:45")}
    {this.renderTime("05:00")}
    {this.renderTime("05:15")}
    {this.renderTime("05:30")}
    {this.renderTime("05:45")}
    {this.renderTime("06:00")}
    {this.renderTime("06:15")}
    {this.renderTime("06:30")}
    {this.renderTime("06:45")}
    {this.renderTime("07:00")}
    {this.renderTime("07:15")}
    {this.renderTime("07:30")}
    {this.renderTime("07:45")}


   */}
   <tr>
     <td> </td><td className="td-center"> <h5> Wake Up </h5> </td> </tr> 
    
      {this.renderTime("08:00")}
      {this.renderTime("08:15")}
      {this.renderTime("08:30")}    
      {this.renderTime("08:45")}
      {this.renderTime("09:00")} 
      {this.renderTime("09:15")} 
      {this.renderTime("09:30")} 
      {this.renderTime("09:45")} 
      {this.renderTime("10:00")} 
      {this.renderTime("10:15")} 
      {this.renderTime("10:30")}
      {this.renderTime("10:45")} 
      {this.renderTime("11:00")} 
      {this.renderTime("11:15")} 
      {this.renderTime("11:30")} 
      {this.renderTime("11:45")} 
      {this.renderTime("12:00")}
      {this.renderTime("12:15")} 
      {this.renderTime("12:30")} 
      {this.renderTime("12:45")}
      {this.renderTime("13:00")}
       {this.renderTime("13:15")}
       {this.renderTime("13:30")} 
        {this.renderTime("13:45")}
         {this.renderTime("14:00")}
         {this.renderTime("14:15")}
          {this.renderTime("14:30")} 
          {this.renderTime("14:45")}
          {this.renderTime("15:00")}
          {this.renderTime("15:15")}
          {this.renderTime("15:30")} 
          
          {this.renderTime("15:45")} 
           {this.renderTime("16:00")} 
           {this.renderTime("16:15")} 
            {this.renderTime("16:30")} 
             {this.renderTime("16:45")} 
             {this.renderTime("17:00")} 
              {this.renderTime("17:15")} 
               {this.renderTime("17:30")} 
               {this.renderTime("17:45")} 
               {this.renderTime("18:00")}
               {this.renderTime("18:15")} 
               {this.renderTime("18:30")} 
       {this.renderTime("18:45")} 
       {this.renderTime("19:00")} 
       {this.renderTime("19:15")}
        {this.renderTime("19:30")}
        {this.renderTime("19:45")}
        {this.renderTime("20:00")}
        {this.renderTime("20:15")}
        {this.renderTime("20:30")}
        {this.renderTime("20:45")}
         {this.renderTime("21:00")}
          {this.renderTime("21:15")}
          {this.renderTime("21:30")}
          {this.renderTime("21:45")}
          {this.renderTime("22:00")}
          {this.renderTime("22:15")}
          {this.renderTime("22:30")} 
           {this.renderTime("22:45")} 
       {this.renderTime("23:00")}
       {/* {this.renderTime("24:00")}
        {this.renderTime("24:15")}
        {this.renderTime("24:30")}
        {this.renderTime("24:45")} */}
        
   <tr>
<td></td>     <td className="td-center"> <h5> Sleep!</h5> </td> </tr> 


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

setTimes() {
  
  var wakeupnum = parseInt(this.state.times.wakeup.toString().substring(0,2))* 60 + parseInt(this.state.times.wakeup.toString().substring(3));
  var sleepnum = parseInt(this.props.times.sleep.toString().substring(0,2))* 60 + parseInt(this.props.times.sleep.toString().substring(3));
  this.state.wakeup = wakeupnum;
  this.state.sleep =sleepnum;
}
render() {

  if(!this.props.times) {
    return;
  }
  if (this.props.times) {
    console.log(this.props.times)
    console.log("IS TIMES IN TB")
    this.state.times = this.props.times
    this.setTimes();
   } 
  if(this.props.budget) { 
    this.state.budget = this.props.budget;
    if(this.props.days){

      this.state.dailybudget = this.state.budget / this.props.days
      this.state.dailybudget = Math.round(this.state.dailybudget)
      console.log("num days is" + this.props.days)

    }
  }
  if(this.props.daynum) {
    this.state.daynum = this.props.daynum
  }
 
  return(
      <div>
    
    {this.renderTable()}

       </div>

  );
}
}
export default Timetable
