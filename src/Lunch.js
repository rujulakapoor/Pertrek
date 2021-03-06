
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FiEdit2, FiSave} from 'react-icons/fi'
import {Button, Jumbotron, Table, Tabs,Tab, TabPane, Accordion,Card, Form, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
import React, { Component } from "react";
export class Lunch extends Component {
        
    constructor(props) {
        super(props);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeBudget= this.changeBudget.bind(this)
        this.state = { 
            checked: true,
            editlocation:false,
            editbudget:false, 
        
        };
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }
    handleChangeCheck() {
        //alert("hello");
        this.setState({
          checked: !this.state.checked
        })
    }
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
        if(input === 'budget'){
          this.props.lailafunc(e.target.value);
        } 
    }
    closeAll = () => {
        this.refs.run1.instance.hide();
        this.refs.run2.instance.hide();
        this.refs.run3.instance.hide();
    }
    
    toggleFirst = () => {
        this.refs.run1.instance.toggle();
    }
    locationRender() {

        if(this.state.editlocation) {
          return(
          <div className="MealsStuff" id="moreMealStuff">      
          <input type="text" placeholder={this.state.location}  onChange={this.handleChange('location')}/>
          </div>
          )
          
        }
        else {
          return(
          <div className="MealsStuff" id="moreMealStuff">
          <h4> {this.state.location} </h4>
          </div>  
            );
        }
      
    }
    locationButtonRender() {
        if(this.state.editlocation) {
        return(     
            <div className="MealsStuff" id="moreMealStuff">  
            <Button variant="light" onClick={this.changeLocation}>
             <FiSave />
             </Button>
             </div>

        )
        } else {
          return( 
            <div className="MealsStuff" id="moreMealStuff">      
                <Button id="edit" variant="light" onClick={this.changeLocation}>
               <FiEdit2 />
               </Button>
            </div>
        )
        }
      }
      budgetRender() {

        if (this.state.editbudget) {
            
          return(
          <div className="MealsStuff" id="moreMealStuff">  
          <input type="number" placeholder={this.state.budget} onChange={this.handleChange('budget')}/>
          </div>
          );
        } 
        else {
          return(
          <div className="MealsStuff" id="moreMealStuff">      
          <h4>${this.state.budget}</h4>
          </div>
          
          );
        }
      
      }
      budgetButtonRender() {
        if(this.state.editbudget) {
          return(   
               <div className="MealsStuff" id="moreMealStuff">   
               <Button variant="light" onClick={this.changeBudget}>
               <FiSave />
               </Button>
               </div>
          )
          } else {
            return(     
                <div className="MealsStuff" id="moreMealStuff">   
                 <Button variant="light" onClick={this.changeBudget}>
                 <FiEdit2 />
                 </Button>
                 </div>
          )
          }
        
        }

      changeLocation() {
          alert("herrrrrrrrrrrrrrrr");
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
    
    render() {
        const content = this.state.checked 
      ? null
      : <div className="MealsStuff" id="moreMealStuff"> 
            <Row>
           <Col>
            <h4>  Resturant:  </h4>
                {this.locationRender()}
                {this.locationButtonRender()}
            </Col>
            <Col>
            <h4>  Budget:  </h4>
            {this.budgetRender()}
            {this.budgetButtonRender()}
            </Col> 
            </Row>      
        </div>;

/*
   <Accordion defaultActiveKey="1">
     <Card className="notes2">

       <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
       <FontAwesomeIcon icon={faPizzaSlice} size = '2x' color='#c7d0d8' className="mr-3"/>  
       <h2>Lunch</h2>
       </Accordion.Toggle>
       <Accordion.Collapse eventKey="0">
       <Card.Body>
          <div className="mbsc-btn-group-block">
                <div>
                <div>
                    <h3>I'm Not Eating</h3>
                    <input 
                    type="checkbox" 
                    checked={ this.state.checked } 
                    onChange={ this.handleChangeCheck } />
                </div>
                { content }
                </div>
                </div>
        </Card.Body>
       </Accordion.Collapse>

     </Card>


 
    </Accordion>
 
     






*/
    return (
        <div id="meals2" className="breakfast">   
      

    <Row>
    
    <div id="lll" className="llll">
        <h1>Lunch</h1>
    </div> 
    <Card  style={{ width: '34rem', height: '14rem'  }}  >
    <Card.Img src="https://lh3.googleusercontent.com/XCBacUYzIkVIVub-ORPRrq1bTcGV-5MVhiN6OPMFcD-NsZPIiu1s2qOlP_ss-xZ0b7cKTK4QfBBqoNILXGFDDMWTCwS8li4kfO5HGp4ZQ6dWpbXY8hj9dIPA3-_iBvo7H4ghw6G0Dg=w2400" height="250" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Body>
          <div class="bottom-left2">
                <div class="settingForm2">
                <div>
                    <h3>I'm Not Eating</h3>
                    <input 
                    type="checkbox" 
                    checked={ this.state.checked } 
                    onChange={ this.handleChangeCheck } />
                </div>
                { content }
                </div>
          </div>
        </Card.Body>
      </Card.ImgOverlay>
  </Card>    
  </Row>
    </div>
    );
    }   

}
export default Lunch;