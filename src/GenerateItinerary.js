import React, { Component,useState } from 'react';
import {Button, Jumbotron, Table, Tabs,Tab, TabPane, Accordion,Card, Container, Row, Col,
Nav, NavItem, NavLink } from 'react-bootstrap'
import { Link } from "react-router-dom";
import {FiEdit2, FiSave} from 'react-icons/fi'
import {FaCheck} from 'react-icons/fa'
import fire from "./config/fire";
import TimePicker from 'react-gradient-timepicker'; 
import Timetable from './Timetable'
import PreviewAttractions from './PreviewAttractions'
import { TimeInput } from './TimeInput';
import { TimeInput2 } from './TimeInput2';
import RentalCar from './RentalCar'
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import Snack from "./Snack";
import Other from "./Other";
import Plane from "./Plane";
import Plane1 from "./Plane1"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee } from '@fortawesome/free-solid-svg-icons'
export class GenerateItinerary extends Component {

constructor(props){
  super(props);
  this.save= this.save.bind(this);
  this.changeTitle = this.changeTitle.bind(this)
  this.calculateDaysAgain = this.calculateDaysAgain.bind(this)
  this.changeNotes= this.changeNotes.bind(this)
  this.changeStart = this.changeStart.bind(this)
  this.changeEnd = this.changeEnd.bind(this)
  this.changeBudget= this.changeBudget.bind(this)
  this.changeLocation = this.changeLocation.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.handleSavedEdits =this.handleSavedEdits.bind(this)

  this.state = {
    
    enddate: this.props.values.enddate,
    startdate:this.props.values.startdate,
    budget: this.props.values.budget,
    title: this.props.values.title,
    notes:this.props.values.notes,
    location:this.props.values.location,
    Plate:this.props.values.Plate,
    CostH:this.props.values.CostH,
    costcc:this.props.values.costcc,
    HName:this.props.values.HName,
    plane1n:this.props.values.plane1n,
    plane1d:this.props.values.plane1d,
    plane1t:this.props.values.plane1t,
    plane2n:this.props.values.plane2n,
    plane2d:this.props.values.plane2d,
    plane2t:this.props.values.plane2t,
    plane3n:this.props.values.plane3n,
    plane3d:this.props.values.plane3d,
    plane3t:this.props.values.plane3t,
    countf:this.props.values.countf,
    days: [],
    alreadysaved: false,
    edittitle:false,
    editlocation:false,
    editbudget:false,
    editnotes:false,
    editstart:false,
    editend:false,
    itkey: this.props.values.itkey


  }
}


handleChange = input => e => {
  this.setState({[input]: e.target.value})

}




calculateDaysAgain() {
  let currentState = this
console.log("IN CALCULATE AGAIN")
  const end=new Date(this.state.enddate);
  end.setDate(end.getDate() + 1);
  const start = new Date(this.state.startdate);
  start.setDate(start.getDate() + 1);
  currentState.setState({
    days: []
  }, function() {


    let len = 1
    for( var d = start; d <= end ; d.setDate(d.getDate() + 1))
    {
      currentState.state.days.push(new Date(d));
      if(len++ > 31) {
        break
      }
    }


  })
  console.log(this.state.days);
  this.setState({
    alreadysaved:true
  })


}

componentWillMount() {
  const end=new Date(this.state.enddate);
  end.setDate(end.getDate() + 1);
  const start = new Date(this.state.startdate);
  start.setDate(start.getDate() + 1);

  let len = 1
  for( var d = start; d <= end ; d.setDate(d.getDate() + 1))
  {
    this.state.days.push(new Date(d));
    if(len++ > 31) {
      break
    }
  }
  console.log("IN COMPONENT WILL MOUNT")
}


handleSavedEdits() {
    //delete old Itinerary

    if(this.state.itkey != null && this.state.alreadysaved === false) {
      //Delete from firebase
      const user = fire.auth().currentUser.uid;
      fire.database().ref('itineraries/' + user).child(this.state.itkey).remove();

      // if(this.state.alreadysaved == true) {
      //   this.setState({
      //     alreadysaved: false
      //   })
      //
      // }

      this.save()
  }
  else {
    this.save()
  }

}

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

    save() {
      //need to update itkey
      if(this.state.alreadysaved == false){
      const user = fire.auth().currentUser.uid
      const db = fire.database().ref('itineraries/' + user);
      const item = {
        notes: this.state.notes,
        title: this.state.title,
        location: this.state.location,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        budget: this.state.budget,
        Plate:this.state.Plate,
        CostH:this.state.CostH,
        costcc:this.state.costcc,
        HName:this.state.HName,
        plane1n:this.state.plane1n,
        plane1d:this.state.plane1d,
        plane1t:this.state.plane1t,
        plane2n:this.state.plane2n,
        plane2d:this.state.plane2d,
        plane2t:this.state.plane2t,
        plane3n:this.state.plane3n,
        plane3d:this.state.plane3d,
        plane3t:this.state.plane3t,
        countf:this.state.countf,
        
      }

        db.push(item
        ).then(ref => {
         console.log('Added document with ID: ', ref.id);
         console.log(ref)
         this.setState({
           itkey: ref.path.pieces_[2]
         })
       });
        
        
       
       console.log("save completed?" + item);
       console.log(item);
       this.setState({
         alreadysaved: true
       })
    }
    else {
      console.log("Already saved")

    }

  }


titleRender() {
  if(this.state.edittitle) {
    return(<input type="text" placeholder={this.state.title} onChange={this.handleChange('title')}/>)
  }
  else {
    return(<h1> {this.state.title} </h1>);
    console.log("state HERE is " + this.state.title)
  }

}


notesRender() {
  if(this.state.editnotes) {
    return(<input type="text" placeholder={this.state.notes} onChange={this.handleChange('notes')}/>)
  }
  else {
    return(<h4> {this.state.notes} </h4>);
  }

}



startRender() {
  if(this.state.editstart) {
    return(<input type="date" placeholder={this.state.startdate} onChange={this.handleChange('startdate')}/>)
  }
  else {
    let day= new Date(this.state.startdate);
    return(<h5> {this.state.startdate}</h5>);
  }

}




endRender() {
  if(this.state.editend) {
    return(<input type="date" placeholder={this.state.enddate} onChange={this.handleChange('enddate')}/>)
  }
  else {

    let day= new Date(this.state.enddate);
    return(<h5> {this.state.enddate} </h5>);
  }

}



locationRender() {

  if(this.state.editlocation) {
    return(<input type="text" placeholder={this.state.location} onChange={this.handleChange('location')}/>)

  }
  else {
    return(<h5> {this.state.location}</h5>);
  }

}

budgetRender(e) {

  if (this.state.editbudget) {
    return(<input type="number" placeholder={this.state.budget} onChange={this.handleChange('budget')}/>);
  } else {
    return(<h5>${this.state.budget}</h5>);
  }

}

locationButtonRender() {
  if(this.state.editlocation) {
  return(      <Button variant="light" onClick={this.changeLocation}>
       <FiSave />
       </Button>
  )
  } else {
    return(      <Button variant="light" onClick={this.changeLocation}>
         <FiEdit2 />
         </Button>
  )
  }

}


budgetButtonRender() {
if(this.state.editbudget) {
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

titleButtonRender() {
  
if(this.state.edittitle) {
return(<Button variant="light" onClick={this.changeTitle}>
     <FiSave />
     </Button>
)
} else {
  return(      <Button variant="light" onClick={this.changeTitle}>
       <FiEdit2 />
       </Button>
)
}

}
startButtonRender() {
if(this.state.editstart) {
return(<Button variant="light" onClick={this.changeStart}>
     <FiSave />
     </Button>
)
} else {

  return(
    <Button variant="light" onClick={this.changeStart}>
       <FiEdit2 />
       </Button>
)
}

}

endButtonRender() {
if(this.state.editend) {
return(<Button variant="light" onClick={this.changeEnd}>
     <FiSave />
     </Button>
)
} else {
  return(      <Button variant="light" onClick={this.changeEnd}>
       <FiEdit2 />
       </Button>
)
}

}

notesButtonRender() {
  if(this.state.editnotes) {
  return(<Button variant="light" onClick={this.changeNotes}>
       <FiSave />
       </Button>
  )
  } else {
    return(      <Button variant="light" onClick={this.changeNotes}>
         <FiEdit2 />
         </Button>
  )
  }

}



changeLocation() {
  if(this.state.editlocation === false) {
    this.setState({
      editlocation:true
    })
  } else {
    this.setState({
      editlocation:false,
      alreadysaved:false
    })

  }
}

changeBudget() {
  if(this.state.editbudget === false) {
    this.setState({
      editbudget:true
    });
  } else {
    this.setState({
      editbudget:false,
      alreadysaved:false
    })
  }

}



changeNotes() {
  if(this.state) {
  if(this.state.editnotes === false) {
    this.setState({
      editnotes: true
    })
  } else {
    this.setState({
      editnotes:false,
      alreadysaved:false
    })
  }
  }
}


changeStart() {
  if(this.state.editstart === false) {
    this.setState({
      editstart: true
    })
  } else {

      this.calculateDaysAgain()
    this.setState({
      editstart:false,
      alreadysaved:false
    })
  }
}

changeEnd() {
  if(this.state.editend === false) {
    this.setState({
      editend: true
    })
  } else {
    this.calculateDaysAgain()

    this.setState({
      editend:false,
      alreadysaved:false
    })
  }
}

changeTitle() {
  if(this.state.edittitle === false) {
    this.setState({
      edittitle: true
    })
    console.log("SET EDIT TITLE TO TRUE")
  } else {
    this.setState({
      edittitle:false,
      alreadysaved:false
    })
  }
}

trypush(){
  alert("here77777");
  alert("key is" + this.state.itkey)
  const user = fire.auth().currentUser.uid
  fire.database().ref('itineraries/flight' + user).child(this.state.itkey).push({
    FlightName: "American",
    FlighDate: "12/03/2020", 
    FlighTime: "12:00AM"
  });
}


renderCheck(){
  if(this.state.alreadysaved) {
    return(<FaCheck/>);
  }
}

render() {
const {startdate, enddate, location, title, budget, notes,Plate,CostH,HName,costcc,plane1n,plane1d,plane1t ,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf,itkey} = this.state;
const values = {startdate, enddate, title, budget, location, notes, Plate,CostH,HName,costcc,plane1n,plane1d,plane1t,plane2n,plane2d,plane2t,plane3n,plane3d,plane3t,countf,itkey}

console.log("Rendering days:")
console.log(this.state.days)
   return(

     <div id="form">

    <Jumbotron>
    <h1>
        {this.titleRender()}
        {this.titleButtonRender()} </h1>
    </Jumbotron>


    <Accordion defaultActiveKey="1">
     <Card className="notes">

       <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
       Notes
       </Accordion.Toggle>
       <Accordion.Collapse eventKey="0">
         <Card.Body>
         {this.notesRender()}
         {this.notesButtonRender()}
         </Card.Body>
       </Accordion.Collapse>

     </Card>
    </Accordion>


    <Container>
      


<Row>
<h3> Trip Details </h3>
</Row>
<Row>
<Col>
<Row>
  <h4>  Destination:  </h4>{this.locationRender()}
    {this.locationButtonRender()}
</Row>
</Col>

<Col>

<h4>    Budget:</h4>
     {this.budgetRender()}
     {this.budgetButtonRender()}
</Col>
<Col>
<h4>Begin Trip: {this.startRender()} {this.startButtonRender()} </h4>
</Col>
</Row>

    <Row>
    <Col></Col>
    <Col></Col>
    <Col>
<h4> End Trip: {this.endRender()} {this.endButtonRender()} </h4>
    </Col>
    </Row>
    </Container>


<Container>


<Accordion defaultActiveKey="0">  
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <Link  style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Plane Information</span> </Link>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                <div>
                <Plane1 values={values} / >
                </div>  
                </Card.Body>
              </Accordion.Collapse>
            </Card>
  </Accordion>


<Accordion defaultActiveKey="0">  
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <Link  style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Rental Car</span> </Link>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                <RentalCar values={values} / >
                </Card.Body>
              </Accordion.Collapse>
            </Card>
  </Accordion>
  

  

<Accordion defaultActiveKey="0">  
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <Link  style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Meal Inofrmation</span> </Link>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                <div className="MealsStuff" id="moreMealStuff">
                <Breakfast / >
                <Lunch / >
                <Dinner / >  
                <Snack />
                <Other />
                </div> 
                </Card.Body>
              </Accordion.Collapse>
            </Card>
  </Accordion>


  <Accordion defaultActiveKey="0">  
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <Link  style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Customize Itinerary</span> </Link>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                <div id="cus" className="Custom">  
                <h1>Pick a Background Color</h1>  
                <input id="select1" name="check1" type="checkbox" />
                <label for="select1">Black</label>
                <input id="select2" name="check1" type="checkbox" />
                <label for="select2">Blue</label>
                <input id="select3" name="check1" type="checkbox" />
                <label for="select3">Green</label>
                <input id="select4" name="check1" type="checkbox" />
                <label for="select4">Purple</label>
                <input id="select5" name="check1" type="checkbox" />
                <label for="select5">Maroon</label>
                <input id="select6" name="check1" type="checkbox" />
                <label for="select6">Orange</label>
                <input id="select7" name="check1" type="checkbox" />
                <label for="select7">Yellow</label>
                <input id="select8" name="check1" type="checkbox" />
                <label for="select8">Pink</label>

                <h1>Pick a Font</h1>  
                <input id="sel1" name="check1" type="checkbox" />
                <label for="sel1">Quicksand</label>
                <input id="sel2" name="check1" type="checkbox" />
                <label for="sel2">Calibri</label>
                <input id="sel3" name="check1" type="checkbox" />
                <label for="sel3">Arial</label>
                <input id="sel4" name="check1" type="checkbox" />
                <label for="sel4">Comic Sans</label>
                <input id="sel5" name="check1" type="checkbox" />
                <label for="sel5">Times </label>
                <input id="sel6" name="check1" type="checkbox" />
                <label for="sel6">Gothic </label>


                <h1>Pick a Font Size</h1>  
                <input id="se1" name="check1" type="checkbox" />
                <label for="se1">12</label>
                <input id="se5" name="check1" type="checkbox" />
                <label for="se5">16</label>
                <input id="se2" name="check1" type="checkbox" />
                <label for="se2">18</label>
                <input id="se3" name="check1" type="checkbox" />
                <label for="se3">24</label>
                <input id="se4" name="check1" type="checkbox" />
                <label for="se4">30</label>
                <input id="se6" name="check1" type="checkbox" />
                <label for="se6">42</label>

                <h1>Pick a Font Color</h1>  
                <input id="s1" name="check1" type="checkbox" />
                <label for="s1">Black</label>
                <input id="s2" name="check1" type="checkbox" />
                <label for="s2">White</label>

                <div id="cuse" class="wrapper2 wrap wr w">
                  Some text here
                  <Timetable id="time" />
                  <div id="wakeup">
                  Wake Up Time
                  </div>
                  <div>
                  <TimeInput / >
                  </div>
                  <div id="bedtime">
                  Bed Time
                  </div>
                  <div>
                  <TimeInput2 / >
                  </div> 
                 </div>
                 </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
    </Accordion>
  
            
<Row>
<Col sm={10}>

    <Tabs  id="uncontrolled-tab-example">
    {this.state.days.map((day) =>
    
{

  
  
  return(
          
      <Tab eventKey={day.getDate() + day.getMonth()} title={<h5> {day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()}</h5>}  >
      <h1> Schedule for  {day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()} </h1>
      <Timetable /> 
      

      </Tab>

  )
}


    )
  }

      </Tabs>
      </Col>
      <Col sm={2}>


      <Row>
     
     <PreviewAttractions budget={this.state.budget} location={this.state.location}/ >
     </Row>
     
     </Col>
     

     </Row>
<Row>
<Col>
     <Button onClick={this.handleSavedEdits()}> Save </Button>
     </Col>
     <Col>
     {this.renderCheck()}
     </Col>
     </Row>
     </Container>

     </div>


   );

  }
}
export default GenerateItinerary;

