import React, { Component } from 'react';
import {Button, Table, Accordion,Card, Container, Row, Col } from 'react-bootstrap'
import {FiEdit2, FiSave} from 'react-icons/fi'
import fire from "./config/fire";
export class GenerateItinerary extends Component {

constructor(props){
  super(props);
  this.save= this.save.bind(this);
  this.changeTitle = this.changeTitle.bind(this)
  this.changeNotes= this.changeNotes.bind(this)

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
        budget: this.state.budget
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
    return(<input type="text" placeholder={this.state.startdate} onChange={this.handleChange('startdate')}/>)
  }
  else {
    return(<h1> {this.state.startdate} </h1>);
  }

}

endRender() {
  if(this.state.editend) {
    return(<input type="text" placeholder={this.state.enddate} onChange={this.handleChange('enddate')}/>)
  }
  else {
    return(<h1> {this.state.enddate} </h1>);
  }

}



locationRender() {

  if(this.state.editlocation) {
    return(<input type="text" placeholder={this.state.location} onChange={this.handleChange('location')}/>)

  }
  else {
    return(<h1> {this.state.location}</h1>);
  }

}

budgetRender(e) {

  if (this.state.editbudget) {
    return(<input type="number" placeholder={this.state.budget} onChange={this.handleChange('budget')}/>);
  } else {
    return(<h1>{this.state.budget}</h1>);
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
  return(      <Button variant="light" onClick={this.changeStart}>
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

  render() {

   return(

  <div id="form">

    {this.titleRender()}
    {this.titleButtonRender()}


    <Container>
    <Row>
    <Col>
    {this.locationRender()}
    {this.locationButtonRender()}



    </Col>
    <Col>

     </Col>
     <Col>
     {this.budgetRender()}
     {this.budgetButtonRender()}
</Col>
    </Row>
    <Row>
    <Col></Col>
    <Col></Col>
    <Col>
    <Accordion defaultActiveKey="1">
     <Card>

       <Accordion.Toggle as={Card.Header} eventKey="0">
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
    </Col>
    </Row>
    </Container>
     <Table responsive striped bordered variant="dark" width="400">
          <thead>
            <tr>
            <th width="15%">
              <th> 8:00am </th>

              <th> 9:00am </th>

            <th> 10:00am </th>

            <th> 11:00am </th>

            <th> 12:00pm </th>

            <th> 1:00pm </th>
            <th> 2:00pm </th>
            <th> 3:00pm </th>
            <th> 4:00pm </th>
            <th> 5:00pm </th>
            <th> 6:00pm </th>

              <th> 7:00pm </th>

            <th> 8:00pm </th>

            <th> 9:00pm </th>

            <th> 10:00pm </th>
            <th> 11:00pm </th>
            </th>
             </tr>
             </thead>

          <tbody>

          {
            this.state.days.map((day) =>

          <tr width="200">{day.getMonth() + 1}/{day.getDate()}/{day.getFullYear()}</tr>)
          }

      </tbody>
     </Table>
     <h2> Suggested Attractions </h2>
     <Button onClick={this.handleSavedEdits()}> Save</Button>
     </div>


   );

  }
}
export default GenerateItinerary;
