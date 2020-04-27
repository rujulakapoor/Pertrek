import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee, faHotel } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FiEdit2, FiSave} from 'react-icons/fi'
import {Button, Jumbotron,Table, Tabs,Tab, TabPane, Accordion,Card, Form, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
import {faCar} from '@fortawesome/free-solid-svg-icons'   
import React, { Component } from "react";
import fire from "./config/fire";
  
export class RentalCar extends Component {
  

    constructor(props){
        super(props);
        this.calc = this.calc.bind(this);
        this.changePlate = this.changePlate.bind(this)
        this.changeCostH = this.changeCostH.bind(this)
        this.changeHName = this.changeHName.bind(this)
        this.changeCostCC = this.changeCostCC.bind(this)
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
          newbudget:0,
          alreadysaved: false,
          editPlate:false,
          editCostH:false,
          editHName:false,
          editcostcc: false,
            
           
           
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
        //fire.database().ref('itineraries/' + user).child(this.state.itkey).remove();
        fire.database().ref('itineraries/' + user).remove();
        this.save()
    }
    else {
      alert("here44444")
      const user = fire.auth().currentUser.uid;
      fire.database().ref('itineraries/' + user).remove();
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
    
    
    calc(){
        alert("quick maths");
        
        var integer1 = parseInt(this.state.CostH, 10);
        var integer2 = parseInt(this.state.costcc, 10);
        var budget=this.state.budget;
        
        alert(this.state.newbudget);
        this.setState({
          newbudget:budget-integer1-integer2
        })

    }
    PlateRender() {

        if(this.state.editPlate) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.Plate} onChange={this.handleChange('Plate')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.Plate}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    CostHRender() {

        if(this.state.editCostH) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.CostH} onChange={this.handleChange('CostH')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.CostH}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    HNameRender() {

        if(this.state.editHName) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.HName} onChange={this.handleChange('HName')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.HName}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    CostCCRender() {

        if(this.state.editcostcc) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.costcc} onChange={this.handleChange('costcc')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.costcc}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    PlateButtonRender() {
        if(this.state.editPlate) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changePlate}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changePlate}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }

    CostHButtonRender() {
        if(this.state.editCostH) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeCostH}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeCostH}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    HNameButtonRender() {
        if(this.state.editHName) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeHName}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeHName}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    
    CostCCButtonRender() {
        if(this.state.editcostcc) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeCostCC}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeCostCC}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }

    changePlate() {
        if(this.state.editPlate === false) {
          this.setState({
            editPlate:true
          })
        } else {
          this.setState({
            editPlate:false,
            alreadysaved:false
          })
      
        }
      }

      changeCostH() {
        if(this.state.editCostH === false) {
          this.setState({
            editCostH:true
          })
        } else {
          this.setState({
            editCostH:false,
            alreadysaved:false
          })
      
        }
      }
      changeCostCC() {
        if(this.state.editcostcc === false) {
          this.setState({
            editcostcc:true
          })
        } else {
          this.setState({
            editcostcc:false,
            alreadysaved:false
          })
      
        }
      }

      changeHName() {
        if(this.state.editHName === false) {
          this.setState({
            editHName:true
          })
        } else {
          this.setState({
            editHName:false,
            alreadysaved:false
          })
      
        }
      }


    render() {
        return(
            <div>
            
            <div id="RentalCar" className="Car">
              <div id="actwo">
             <div id="carone">
            <div id="centericonsave">
             <Button variant="light" onClick={this.handleSavedEdits}>
            <FiSave />
            </Button> 
            </div> 
             <div id="icondown"> 
             <FontAwesomeIcon icon={faCar} color="white" size = '5x' />  
             </div> 
             <h1>Enter Your Car Info</h1>
             <Row>
              <Col>   
              <h4>  License Plate Number:  </h4>
              {this.PlateRender()}
              {this.PlateButtonRender()}
              </Col>
              <Col>
              <h4>  Rental Car Cost:  </h4>
              {this.CostCCRender()}
              {this.CostCCButtonRender()}
              </Col>
            </Row>
            </div>  
            </div> 
            </div>

            <div id="RentalCar" className="Car">
            <div id="actwo">
            <div id="carone">
            <div id="centericonsave">
             <Button variant="light" onClick={this.handleSavedEdits}>
            <FiSave />
            </Button> 
            </div> 
            <div id="icondown"> 
            <FontAwesomeIcon icon={faHotel} color="white" size = '5x' />
            </div>
            <h1>Enter Your Hotel Info</h1>
            <Row>
            <Col>   
            <h4>  Hotel Name:  </h4>
            {this.HNameRender()}
            {this.HNameButtonRender()}
            </Col>
            <Col>
            <h4>  Hotel Cost:  </h4>
            {this.CostHRender()}
            {this.CostHButtonRender()}
            </Col>
            </Row>
            </div>  
            </div>   
            </div>
            <div className="Carlable">
            <button type="submit" id="planebut" onClick={this.calc} class="btn btn-primary">Calculate Cost</button>
            <h5> Your Remaining Budget Is: {this.state.newbudget}</h5>
            </div>
            </div>
        )
    }
}
export default RentalCar;