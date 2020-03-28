import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FiEdit2, FiSave} from 'react-icons/fi'
import {Button, Jumbotron, Table, Tabs,Tab, TabPane, Accordion,Card, Form, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
import React, { Component } from "react";
export class Breakfast extends Component {
        
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
        alert("hello");
        this.setState({
          checked: !this.state.checked
        })
    }
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
      
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
          <h5> {this.state.location}</h5>
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
          <h5>${this.state.budget}</h5>
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

    return (
        <div id="meals2">
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>   
        
        <mobiscroll.Card collapsible
            ref="run1"
            theme="ios" 
            themeVariant="light"
        >
            <mobiscroll.CardHeader>
                <div>
                    <mobiscroll.CardSubtitle className="mbsc-bold mbsc-txt-s"></mobiscroll.CardSubtitle>
                    <div className="mbsc-bold">  
                    <FontAwesomeIcon icon={faBacon} size = '2x' color='#c7d0d8' className="mr-3"/>
                    <span style={{ fontSize:'20pt', color:"#c7d0d8"}} class="ml-1">Breakfast</span> 
                    </div>
                    
                </div>
            </mobiscroll.CardHeader>
            <mobiscroll.CardContent className="mbsc-no-padding">
                <div className="mbsc-btn-group-block">
                <div>
                <div>
                    <label>I'm Not Eating</label>
                    <input 
                    type="checkbox" 
                    checked={ this.state.checked } 
                    onChange={ this.handleChangeCheck } />
                </div>
                { content }
                </div>
                </div>
            </mobiscroll.CardContent>
        </mobiscroll.Card>
        
    </div>
    );
    }   

}
export default Breakfast;