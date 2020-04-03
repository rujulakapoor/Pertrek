import React, { Component,useState } from 'react';
import {Button, Modal, Jumbotron, Table,Tab,Tabs,TabPane, ProgressBar, Accordion,Card, Badge, Container, Row, Col,
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
import MapAll from "./MapAll";
import LocationIQ from 'react-native-locationiq';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Geocode from "react-geocode";
import bootbox from 'bootbox';
import AddEventModal from './AddEventModal'
import MiniTravelCosts from './MiniTravelCosts'
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
LocationIQ.init("c4e640b5ed0925");
Geocode.setApiKey("AIzaSyBvjIBIZImCFAb-6Rtz2C7EQlnS1Ga1Z0o");
// Geocodio Key: ee000100feccee8445ccfee8e0c0fcedef8e545
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
  this.handleChangeTab1 =this.handleChangeTab1.bind(this)
  this.handleChangeTab2 =this.handleChangeTab2.bind(this)
  this.getDestinations = this.getDestinations.bind(this);
  this.changePartySize = this.changePartySize.bind(this);
  this.saveNewEvent = this.saveNewEvent.bind(this)
  this.newbudget = this.newbudget.bind(this);
  this.handleMiniTravel = this.handleMiniTravel.bind(this)
  this.handleAddBreakfast = this.handleAddBreakfast.bind(this)
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
    partysize:this.props.values.partysize,
    days: [],
    alreadysaved: false,
    edittitle:false,
    editlocation:false,
    editbudget:false,
    editnotes:false,
    editstart:false,
    editend:false,
    editpartysize:false,
    typetab:false,
    itkey: this.props.values.itkey,
    retreived:false,
    destinations: [],
    dailydata: {},
    timesoftheday: [],
    currentEvent: {},
    currentlyEditing: false,
    dailydata: [],
    totalexpenses: 0,
    minitravel: 0,
    breakfast: 0
    


  }
}

handleAddBreakfast(cost) {
  this.setState({
    breakfast: cost
  })
  console.log("HANDLED BREAKFAST")
}
handleMiniTravel(cost) {
  this.setState({
    minitravel: cost
  })
  console.log("Done in mini travel")
}

handleChange = input => e => {
  this.setState({[input]: e.target.value})

}

saveNewEvent = (info) => {
    //Add it to the itinerary table for the desired day. Use the 
    //index of chosen day
    //also, close the modal. 
    //On clicking Add in PreviewAttr
    //change mode to create modal and put the attraction in currentEvent to add to the table

    //assume info has start time, duration, and
    this.setState({
      currentlyEditing:false
    }) 
    console.log("IN SAVE NEW EVENT")
    console.log(info)
    console.log(this.state)

    Object(info.blockids).map((block, key) =>{
      console.log(key)

      if(key == 0) {
        this.state.dailydata[info.day].scheduleactivities[block.toString()].isfirst =true;
        console.log("SETTING KEY " + key + block)
        this.state.dailydata[info.day].scheduleactivities[block.toString()].duration =info.blocks;
        
      } else {
        this.state.dailydata[info.day].scheduleactivities[block.toString()].isfirst =false;

      }
       
      this.state.dailydata[info.day].scheduleactivities[block.toString()].eventdetails = this.state.currentEvent;
         })

    this.state.dailydata[info.day].cost += info.cost;
    this.state.totalexpenses += info.cost;
    console.log("cost added cost is now" + this.state.dailydata[info.day].cost)
         console.log(this.state.dailydata)
    

    // this.state.dailydata[str.valueOf()] = {
    //   scheduleactivities: this.state.timesoftheday,
    //   cost: 0
    // };
}

 
handleEventAdd = (info) => {

  console.log("IN HANDLE EVENT ADD")
  console.log(info)
  this.state.currentEvent = info;
  this.state.currentlyEditing = true;
   

  
} 



handleSaveEvent = (info) => {
  console.log("SAVE EVENT HERE")
 // this.setState({currentlyEditing: false});
  // get info  
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
//this.setState({dailydata: []})




 var intdailydata = []
  let len = 0
  for( var d = start; d <= end ; d.setDate(d.getDate() + 1))
  {
    
    this.state.days.push(new Date(d));

var thisdaystimes = [];

      //Calculate times of day
  var hours = 0;
  var minutes =0;
  for( var i = 0 ; i < 24; i++ ){
    minutes = 0;
    for(var j = 0 ; j < 4; j++)
    {
      var str = "";

      if( hours < 10){
        str += "0"
      }
      str+= hours;
      str+=":"
      if(minutes < 15) {
        str += "00"
      }
      else {
        str += minutes
      }console.log( str)
      
      thisdaystimes[str.valueOf()] = {
        eventdetails: {},
        isfirst: false,
        duration: 0
      }
      minutes+= 15
    }
    hours++;

  } 






    str = len.toString();

      //initialize dailydata for days
      
    intdailydata[str.valueOf()] = {
      scheduleactivities: thisdaystimes,
      cost: 0
    };
 
    if(len++ > 30) {
      break
    }
  }
  this.setState({numdays: len})
  console.log("IN COMPONENT WILL MOUNT")
  this.getDestinations();

console.log(this.state.dailydata)
this.setState({dailydata: intdailydata})
this.state.timesoftheday[1000] = "BOFA"
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
        partysize:this.state.partysize
        
      }

      if (item.partysize === undefined) {
        item.partysize = null;
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
     // console.log("Already saved")

    }

  }

  getDestinations() {
    if(this.state.retreived === false ){
      const user = fire.auth().currentUser.uid;
      fire.database().ref('destinations/' + user + '/' + this.state.title
      ).on("value", snapshot=> {
        if(snapshot.val()) {
        let currentstate = this;
        console.log("dest snapshot is ")
        //alert("inside getdest")
        console.log(snapshot.val())
    
        const values = snapshot.val();
        console.log(values);
    
        var name;
        var id;
        Object.entries(values).map((thing) => {
          console.log("key val is " + thing ) ;
          console.log(thing[1].name);
          name = thing[1].name;
          console.log(thing[1].address);
          console.log(thing[1].id);
          id = thing[1].id;
          var thing;
          /*
          geocodio.get('geocode', {q: thing[1].address}, function(err, response){
            if (err) throw err;
            
            console.log(response);
          });
          
          LocationIQ.search(thing[1].address)
          .then(json => {
              var lat = json[0].lat;
              var lon = json[0].lon;
              console.log(lat, lon);
              thing = {
                lat: lat,
                lon: lon
              }
              
          })
          .catch(error => console.warn(error));
          */
          Geocode.fromAddress(thing[1].address).then(
            response => {
            //  console.log("RESPONSE FROM GOOGLE GEOCODER")
         //     console.log(response)
           //   console.log(response.results[0].geometry.location)
              if (response.results[0] != undefined) {
                var lat = response.results[0].geometry.location.lat;
                var lon = response.results[0].geometry.location.lng;
                var item = {
                  lat: lat,
                  lon: lon,
                  name: thing[1].name,
                  address: thing[1].address
                }
                this.setState( {
                  destinations: [...currentstate.state.destinations, item]
                })
              }
            },
            error => {
              alert('Geocode was not successful for the following reason: ' + error);
            }
          );

          /*
          console.log("PUT THE SET STATE HERREEE THEN")
          currentstate.setState( {
            destinations: [...currentstate.state.destinations,  thing]
          })
          */ 
          console.log(this.state.destinations)
        })
  
        }
      })
    
        // console.log(snapshot.val())
        // this.setState( {
        // itineraries: [...this.state.itineraries, snapshot.val()]
      //0})
    
      this.state.retreived=true;
      }
    }


    
renderCostBar() {
   var percentCost = 0;
   var percentFood = 0;
  let badge = <Badge variant="info" > You Are Under Budget!</Badge>
  var percenttravel = 0;
  if(this.state.budget != 0) {

      percentCost = this.state.totalexpenses  / this.state.budget;
      percentCost *= 100
      percentCost = Math.round(percentCost)
      if(percentCost > 100) {
        percentCost = 100; 
        badge = <Badge variant="danger" > You Are Over Budget</Badge>
      }

      percenttravel = this.state.minitravel * this.state.numdays / this.state.budget;
      percenttravel *=100;
      percenttravel = Math.round(percenttravel)
      if(percenttravel>100) {
        percenttravel = 100;
        badge = <Badge variant="danger" > You Are Over Budget</Badge>

      }

      percentFood = this.state.breakfast * this.state.numdays / this.state.budget;
      percentFood *= 100;
      percentFood = Math.round(percentFood)
      if(percentFood> 100 ){
        badge = <Badge variant="danger" > You Are Over Budget</Badge>
        percentFood = 100;
      }
      if(percenttravel + percentCost + percentFood > 100) {
        badge = <Badge variant="danger" > You Are Over Budget</Badge>

      }

 
     
  }
  var totalwithtravel = parseInt(this.state.totalexpenses) + (parseInt(this.state.minitravel) + parseInt(this.state.breakfast)) * (parseInt(this.state.numdays));
  return(
    <div>
      <h2> Current Cost : ${totalwithtravel} </h2>
      { badge }
      <ProgressBar>
      <ProgressBar variant="success" now={percentCost} key={1} label={`${percentCost}%`} />
      <ProgressBar variant="info" now={percentFood} key={3} label={`${percentFood}%`} />

      <ProgressBar variant="warning" now={percenttravel} key={2} label={`${percenttravel}%`} />
      </ProgressBar>
    </div>
  )

}



modalRender() {
  if(this.state.currentlyEditing) {
     return( 
      <AddEventModal days={this.state.days} saveNewEvent={this.saveNewEvent}
 
/>
      )
  }   
}

titleRender() {
  if(this.state.edittitle) {
    return(<input type="text" placeholder={this.state.title} onChange={this.handleChange('title')}/>)
  }
  else {
    return(<h1> {this.state.title} </h1>);
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
partySizeRender(e) {
  if (this.state.editpartysize) {
    return(<input type="number" placeholder={this.state.partysize} onChange={this.handleChange('partySize')}/>);
  } else {
    return(<h5>{this.state.partysize}</h5>);
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
handleChangeTab1(){
  alert("made it big")
  this.setState({
   typetab:true,
  })
}
handleChangeTab2(){
  alert("made it big")
  this.setState({
   typetab:false,
  })
}
tabRender() {
  if(this.state.typetab==false){
  return(
    
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link  className="inactive" activeClassName="active" eventKey="first">Tab 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  className="inactive"  activeClassName="active" eventKey="second">Tab 2</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="first">
           <div className="tabStuff">
           Day 1 
           </div> 
          <Timetable id="time" />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
          <div className="tabStuff">
           Day 2 
           </div> 
          <Timetable id="time" />
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  )
  }
  else{
    return(
    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
  <Tab eventKey="home" title="Home">
  <div className="tabStuff">
           Day 1 
           </div> 
  <Timetable id="time" />
  </Tab>
  <Tab eventKey="profile" title="Profile">
  <div className="tabStuff">
  Day 2  
  </div> 
  <Timetable id="time" />
  </Tab>
</Tabs>
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

newbudget(dailybudget) {
  console.log("IN NEW BUDGET")
  var newb = dailybudget * this.state.numdays;
  console.log("NEW BUDGET IS" + newb)
  this.setState({
    budget: newb
  })
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

partySizeButtonRender() {
  if(this.state.editpartysize) {
  return(<Button variant="light" onClick={this.changePartySize}>
       <FiSave />
       </Button>
  )
  } else {
    return(      <Button variant="light" onClick={this.changePartySize}>
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
   } else {
    this.setState({
      edittitle:false,
      alreadysaved:false
    })
  }
}

changePartySize() {
  if(this.state.editpartysize === false) {
    this.setState({
      editpartysize: true
    })
   } else {
    this.setState({
      editpartysize:false,
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
 
let statenow = this
  fire.auth().onAuthStateChanged( function(user) {
      if (user) {
//console.log("grabbin dests")
 statenow.getDestinations();
}})
//console.log(this.state.destinations)
   return(

     <div id="form">
  

   {this.modalRender()}

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
<Row className="goback">
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
    <Col><MiniTravelCosts handlemini={this.handleMiniTravel}/></Col>
    <Col></Col>
    <Col>
<h4> End Trip: {this.endRender()} {this.endButtonRender()} </h4>
    </Col>
    </Row>
    
    </Container>
    <Container>
      <Row>
        <h4>Party Size: {this.partySizeRender()} {this.partySizeButtonRender()}</h4>
      </Row>
      <Row>
        {this.renderCostBar()}
        </Row>
    <Row>
      <h3>SHARE&nbsp;&nbsp;&nbsp;&nbsp;</h3>
      <EmailShareButton 
        url={window.location.href}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <FacebookShareButton 
        url={window.location.href}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LineShareButton 
        url={window.location.href}
      >
        <LineIcon size={32} round={true} />
      </LineShareButton>
      <LinkedinShareButton 
        url={window.location.href}
      >
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <PinterestShareButton 
        url={window.location.href}
      >
        <PinterestIcon size={32} round={true} />
      </PinterestShareButton>
      <RedditShareButton 
        url={window.location.href}
      >
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
      <TwitterShareButton 
        url={window.location.href}
      >
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton 
        url={window.location.href}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
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
                <Breakfast lailafunc={this.handleAddBreakfast} / >
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

                <h1>Pick a Tab</h1>  
                <input onChange={this.handleChangeTab1} id="tab1" name="check1" type="checkbox" />
                <label for="tab1">Tab Style 1</label>
                <input onChange={this.handleChangeTab2} id="tab2" name="check1" type="checkbox" />
                <label for="tab22">Tab Style 2</label>

                <div id="cuse" class="wrapper2 wrap wr w">
                  {this.tabRender()} 
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
    {this.state.days.map((day, key) =>
    
{

  console.log(key)
  // var day = this.state.days[data[0]]
  // console.log(day)
   console.log("IS DAY IN TABS")
  
  return(
          
      <Tab eventKey={day.getDate() + day.getMonth()} title={<h5> {day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()}</h5>}  >
      <h1> Schedule for  {day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()} </h1>
      <Timetable travel={this.state.minitravel} food={this.state.breakfast} newbudget={this.newbudget}times={this.state.dailydata[key]} budget={this.state.budget} days={this.state.numdays}/> 
      <div className="MealsStuff" id="moreMealStuff">
                <Breakfast / >
                <Lunch / >
                <Dinner / >  
                <Snack />
                <Other />
                </div>       

      </Tab>

  )
}


    )
  }

      </Tabs>
      </Col>
      <Col sm={2}>


      <Row>
     
     <PreviewAttractions handleAdd={this.handleEventAdd} budget={this.state.budget} location={this.state.location} itkey={this.state.itkey} title={this.state.title} partysize={this.state.partysize}/ >
     </Row>
     
     </Col>
     <MapAll destinations={this.state.destinations} />
     

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

