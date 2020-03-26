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

  
export class RentalCar extends Component {
        
    constructor(props){
        super(props);
        this.calc = this.calc.bind(this);
        this.changeLocation = this.changeLocation.bind(this)
        this.changeCostC = this.changeCostC.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeCostCC = this.changeCostCC.bind(this)
        this.state = {
            editlocation:false,
            editcostc:false,
            editname:false,
            editcostcc: false
        }
    }
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
      
    }
    calc(){
        alert("quick maths");
        
        var integer1 = parseInt(this.state.costc, 10);
        var integer2 = parseInt(this.state.costcc, 10);
        var budget=100;
        var newbudget=budget-integer1-integer2;
        alert(newbudget);

    }
    locationRender() {

        if(this.state.editlocation) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.location} onChange={this.handleChange('location')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.location}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    CostCRender() {

        if(this.state.editcostc) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.costc} onChange={this.handleChange('costc')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.costc}</h5>
          </Row>  
          </Col>
          </div>
        
          );
        }
      
    }
    NameRender() {

        if(this.state.editName) {
          return(
          <div className="CarCar">
          <Row>  
          <input  type="text" placeholder={this.state.name} onChange={this.handleChange('name')}/>
          </Row>  
          </div>    
          )
      
        }
        else {
          return(
          <div className="Car"> 
          <Col>
           <Row>  
          <h5> {this.state.name}</h5>
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
    locationButtonRender() {
        if(this.state.editlocation) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeLocation}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeLocation}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }

    CostCButtonRender() {
        if(this.state.editcostc) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeCostC}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeCostC}>
               <FiEdit2 />
               </Button>
                </div>
               </Row> 
        )
        }
      
    }
    NameButtonRender() {
        if(this.state.editName) {
        return(   
            <Row>    
             <div id="CardLeft">
             <Button variant="light" onClick={this.changeName}>
             <FiSave />
             </Button>
             </div>
             </Row> 
        )
        } else {
          return(     
                <Row>  
                <div id="CardLeft">
                <Button variant="light" onClick={this.changeName}>
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

      changeCostC() {
        if(this.state.editcostc === false) {
          this.setState({
            editcostc:true
          })
        } else {
          this.setState({
            editcostc:false,
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

      changeName() {
        if(this.state.editName === false) {
          this.setState({
            editName:true
          })
        } else {
          this.setState({
            editName:false,
            alreadysaved:false
          })
      
        }
      }


    render() {
        return(
            <div>
            <div id="RentalCar" className="Car">
             <div id="carone">
             <h1>Enter Your Car Info</h1>
             <Row>
              <Col>   
              <h4>  License Plate Number:  </h4>
              {this.locationRender()}
              {this.locationButtonRender()}
              </Col>
              <Col>
              <h4>  Rental Car Cost:  </h4>
              {this.CostCCRender()}
              {this.CostCCButtonRender()}
              </Col>
            </Row>
            </div>  

            <div id="cartwo" className="Car2">
            <h3>Enter Your Car Info</h3>   
            <FontAwesomeIcon icon={faCar} color="#c7d0d8" size = '10x' />
            </div > 
            </div>

            <div id="carthree">

            </div>




            <div id="RentalCar" className="Car">
            <div id="carone">
            <h1>Enter Your Hotel Info</h1>
            <Row>
            <Col>   
            <h4>  Hotel Name:  </h4>
            {this.NameRender()}
            {this.NameButtonRender()}
            </Col>
            <Col>
            <h4>  Hotel Cost:  </h4>
            {this.CostCRender()}
            {this.CostCButtonRender()}
            </Col>
            </Row>
            </div>  

            <div id="cartwo" className="Car2">
            <h3>Enter Your Car Info</h3>   
            <FontAwesomeIcon icon={faHotel} color="#c7d0d8" size = '10x' />
            </div> 
            </div>
            <button type="submit" onClick={this.calc} class="btn btn-primary">Calculate Cost</button>
            </div>
        )
    }
}
export default RentalCar;