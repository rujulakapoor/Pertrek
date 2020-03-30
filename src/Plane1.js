import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FiEdit2, FiSave,FiX} from 'react-icons/fi'
import {Button, Jumbotron,Table, Tabs,Tab, TabPane, Accordion,Card, Form, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
import {faCar} from '@fortawesome/free-solid-svg-icons'   
import React, { Component } from "react";
import fire from "./config/fire";
  
export class Plane1 extends Component {
  

    constructor(props){
        super(props);
        this.countButtons=this.countButtons.bind(this);
        this.removeButton=this.removeButton.bind(this);
        this.addFlight=this.addFlight.bind(this);
        this.changeplane1n = this.changeplane1n.bind(this)
        this.changeplane1d = this.changeplane1d.bind(this)
        this.changeplane1t = this.changeplane1t.bind(this)
        this.changeplane2n = this.changeplane2n.bind(this)
        this.changeplane2d = this.changeplane2d.bind(this)
        this.changeplane2t = this.changeplane2t.bind(this)
        this.changeplane3n = this.changeplane3n.bind(this)
        this.changeplane3d = this.changeplane3d.bind(this)
        this.changeplane3t = this.changeplane3t.bind(this)
        this.handleSavedEdits =this.handleSavedEdits.bind(this)
        this.save= this.save.bind(this);

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
          itkey: this.props.values.itkey,
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
          alreadysaved: false,
          editplane1n:false,
          editplane1d:false,
          editplane1t:false,
          editplane2n:false,
          editplane2d:false,
          editplane2t:false,
          editplane3n:false,
          editplane3d:false,
          editplane3t:false,
          showing: false,
          showing2: false,  
          showing3:false,  
          showing4:false,
          showing5: false,
          showing6:false,
          flightNum: 0,

           
           
        }
    }
    continue = e => {
      e.preventDefault();
      this.props.nextStep();
    };

    handleChange = input => e => {
        this.setState({[input]: e.target.value})
      
    }
    handleSavedEdits() {
      //delete old Itinerary
      console.log("key is " + this.state.itkey)
      if(this.state.itkey != null && this.state.alreadysaved === false) {
        //Delete from firebase
        alert("Come On")
        alert("key is " + this.state.itkey)
        const user = fire.auth().currentUser.uid;
        fire.database().ref('itineraries/' + user).child(this.state.itkey).remove();
  
        this.save()
    }
    else {
      alert("here44444")
      this.save()
    }
  
  }
    
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
    
    
  plane1nRender() {

        if(this.state.editplane1n) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.plane1n} onChange={this.handleChange('plane1n')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane1n}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane2nRender() {

        if(this.state.editplane2n) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.plane2n} onChange={this.handleChange('plane2n')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane2n}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane3nRender() {

        if(this.state.editplane3n) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.plane3n} onChange={this.handleChange('plane3n')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane3n}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane1dRender() {

        if(this.state.editplane1d) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="date" placeholder={this.state.plane1d} onChange={this.handleChange('plane1d')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane1d}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane2dRender() {

        if(this.state.editplane2d) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="date" placeholder={this.state.plane2d} onChange={this.handleChange('plane2d')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane2d}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane3dRender() {

        if(this.state.editplane3d) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="date" placeholder={this.state.plane1d} onChange={this.handleChange('plane3d')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane3d}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane1tRender() {

        if(this.state.editplane1t) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="time" placeholder={this.state.plane1t} onChange={this.handleChange('plane1t')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane1t}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane2tRender() {

        if(this.state.editplane2t) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="time" placeholder={this.state.plane2t} onChange={this.handleChange('plane2t')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane2t}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    plane3tRender() {

        if(this.state.editplane3t) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="time" placeholder={this.state.plane3t} onChange={this.handleChange('plane3t')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.plane3t}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    
    plane1nButtonRender() {
        if(this.state.editplane1n) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane1n}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane1n}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane2nButtonRender() {
        if(this.state.editplane2n) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane2n}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane2n}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane3nButtonRender() {
        if(this.state.editplane3n) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane3n}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane3n}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }

    plane1dButtonRender() {
        if(this.state.editplane1d) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane1d}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane1d}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane2dButtonRender() {
        if(this.state.editplane2d) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane2d}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane2d}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane3dButtonRender() {
        if(this.state.editplane3d) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane3d}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane3d}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane1tButtonRender() {
        if(this.state.editplane1t) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane1t}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane1t}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane2tButtonRender() {
        if(this.state.editplane2t) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane2t}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane2t}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    plane3tButtonRender() {
        if(this.state.editplane3t) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeplane3t}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeplane3t}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    changeplane1n() {
        if(this.state.editplane1n === false) {
          this.setState({
            editplane1n:true
          })
        } else {
          this.setState({
            editplane1n:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane2n() {
        if(this.state.editplane2n === false) {
          this.setState({
            editplane2n:true
          })
        } else {
          this.setState({
            editplane2n:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane3n() {
        if(this.state.editplane3n === false) {
          this.setState({
            editplane3n:true
          })
        } else {
          this.setState({
            editplane3n:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane1d() {
        if(this.state.editplane1d === false) {
          this.setState({
            editplane1d:true
          })
        } else {
          this.setState({
            editplane1d:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane2d() {
        if(this.state.editplane2d === false) {
          this.setState({
            editplane2d:true
          })
        } else {
          this.setState({
            editplane2d:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane3d() {
        if(this.state.editplane3d === false) {
          this.setState({
            editplane3d:true
          })
        } else {
          this.setState({
            editplane3d:false,
            alreadysaved:false
          })
      
        }
      }
      
      changeplane1t() {
        if(this.state.editplane1t === false) {
          this.setState({
            editplane1t:true
          })
        } else {
          this.setState({
            editplane1t:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane2t() {
        if(this.state.editplane2t === false) {
          this.setState({
            editplane2t:true
          })
        } else {
          this.setState({
            editplane2t:false,
            alreadysaved:false
          })
      
        }
      }
      changeplane3t() {
        if(this.state.editplane3t === false) {
          this.setState({
            editplane3t:true
          })
        } else {
          this.setState({
            editplane3t:false,
            alreadysaved:false
          })
      
        }
      }
      countButtons(){
          alert(this.state.flightNum + " " + this.state.countf)
        if(this.state.countf==3){  
        this.setState({
            showing3:true,
            showing4:false,
            showing5:false
          })
        }  
        if(this.state.countf==2){  
            this.setState({
                showing3:false,
                showing4:true,
                showing5:false
              })
        }
        if(this.state.countf==1){  
            this.setState({
                showing3:false,
                showing4:false,
                showing5:true
              })
        }
      }
      removeButton(){
          
        var newcountf=this.state.countf-1; 

        this.setState({
            countf:newcountf
        })
          alert(this.state.countf);
          if(this.state.countf==2){  
            this.setState({
                showing3:false,
                showing4:true,
                showing5:false,
                showing6:false,
                plane3n:"",
                plane3d:"",
                plane3t:"",
              })
        }
        if(this.state.countf==1){  
            this.setState({
                showing3:false,
                showing4:false,
                showing5:true,
                showing2:false,
                plane2n:"",
                plane2d:"",
                plane2t:"",
              })
        }
        if(this.state.countf==0){  
            this.setState({
                showing3:false,
                showing4:false,
                showing5:false,
                showing2:false,
                showing:false,
                plane1n:"",
                plane1d:"",
                plane1t:"",
              })
        }

      }

      addFlight(){
          alert("Lets add stuff");
          var newcountf=this.state.countf+1; 

            this.setState({
                countf:newcountf
            })
            alert(this.state.countf);
            if(this.state.countf==-1){  
                this.setState({
                    showing3:false,
                    showing4:false,
                    showing5:true
                  })
            }
            if(this.state.countf==0){  
                this.setState({
                    showing3:false,
                    showing4:true,
                    showing5:false
                  })
            }
            if(this.state.countf==1){  
                this.setState({
                    showing3:true,
                    showing4:false,
                    showing5:false
                  })
            }
          
      }

    render() {
        const { showing, showing2, showing3,showing4,showing5,showing6 } = this.state;
        return(

            <div>
                <div>
                <Col>
                 <h6>  getRightButtuns </h6>
                 <button onClick={this.countButtons}>Count</button>
                 <button onClick={this.addFlight}>Add Flight</button>
                </Col>
                </div>
                
                { showing5 
                    ? <div>
                        <button onClick={() => this.setState({ showing: !showing })}>flight 1</button>
                    </div>
                    
                    : <div>
                           
                      </div>
                }
                { showing4 
                    ? <div>
                        <button onClick={() => this.setState({ showing: !showing })}>flight 1</button>
                        <button onClick={() => this.setState({ showing2: !showing2 })}>flight 2</button>
                    </div>
                    
                    : <div>
                           
                      </div>
                }
                { showing3 
                    ? <div>
                        <button onClick={() => this.setState({ showing: !showing })}>flight 1</button>
                        <button onClick={() => this.setState({ showing2: !showing2 })}>flight 2</button>
                        <button onClick={() => this.setState({ showing6: !showing6 })}>flight 3</button>
                    </div>
                    
                    : <div>
                           
                      </div>
                }
                { showing 
                    ? <div>This is visible
                        <div id="flight" className="flightStuff">
                        <div id="FlightLeft">
                        <button onClick={this.removeButton}>Remove</button>
                        </div>   
                        <FontAwesomeIcon icon={faPlaneDeparture} size = '4x' color='white'/>    
                        <h1>Flight 1 Information</h1>
                        <Row>
                        <Col>   
                        <h6>  Flight 1 Name  </h6>
                        {this.plane1nRender()}
                        {this.plane1nButtonRender()}
                        </Col>
                        <Col>
                        <h6>  Flight 1 Date </h6>
                        {this.plane1dRender()}
                        {this.plane1dButtonRender()}
                        </Col>
                        <Col>
                        <h6>  Flight 1 Time </h6>
                        {this.plane1tRender()}
                        {this.plane1tButtonRender()}
                        </Col>
                        </Row>
                        </div>  
                    </div>
                    : null
                }
                
                { showing2 
                    ? <div>This is visible
                    <div id="flight" className="flightStuff">
                    <div id="FlightLeft">
                    <button onClick={this.removeButton}>Remove</button>   
                    </div>   
                    <FontAwesomeIcon icon={faPlaneDeparture} size = '4x' color='white'/>    
                    <h1>Flight 2 Information</h1>
                    <Row>
                    <Col>   
                    <h6>  Flight 2 Name  </h6>
                    {this.plane2nRender()}
                    {this.plane2nButtonRender()}
                    </Col>
                    <Col>
                    <h6>  Flight 2 Date </h6>
                    {this.plane2dRender()}
                    {this.plane2dButtonRender()}
                    </Col>
                    <Col>
                    <h6>  Flight 2 Time </h6>
                    {this.plane2tRender()}
                    {this.plane2tButtonRender()}
                    </Col>
                    </Row>
                    </div>  
                    </div>
                    : null
                }
                { showing6 
                    ? <div>This is visible
                    <div id="flight" className="flightStuff">
                    <div id="FlightLeft">
                    <button onClick={this.removeButton}>Remove</button>
                    </div>   
                    <FontAwesomeIcon icon={faPlaneDeparture} size = '4x' color='white'/>    
                    <h1>Flight 3 Information</h1>
                    <Row>
                    <Col>   
                    <h6>  Flight 3 Name  </h6>
                    {this.plane3nRender()}
                    {this.plane3nButtonRender()}
                    </Col>
                    <Col>
                    <h6>  Flight 3 Date </h6>
                    {this.plane3dRender()}
                    {this.plane3dButtonRender()}
                    </Col>
                    <Col>
                    <h6>  Flight 3 Time </h6>
                    {this.plane3tRender()}
                    {this.plane3tButtonRender()}
                    </Col>
                    </Row>
                    </div>  
                    </div>
                    : null
                }
            </div>  
            
            
            



            
        )
    }
}
export default Plane1;