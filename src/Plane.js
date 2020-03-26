import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { fas, faHamburger, faPlane, faIceCream, faBirthdayCake, faCookie, faCoffee, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FiEdit2, FiSave,FiX} from 'react-icons/fi'
import {Button, Jumbotron, Table, Tabs,Tab, TabPane, Accordion,Card, Form, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
import React, { Component } from "react";

export class Plane extends Component {
        
    state = { 
    flights: []    
    
    };
    addFlight(){
        this.setState({flights: [...this.state.flights, " "]})
    }
    handleChange(e,index){
        this.state.flights[index] = e.target.value
        this.setState({flights: this.state.flights})
    }
    
    remove(index){
        this.state.flights.splice(index,1);
        this.setState({flights:this.state.flights })
    }
    render() {


    return (
        <div className="Plane">
        <h1>Flight Information</h1>
        {
            this.state.flights.map((flight,index) =>{
                 return(
                     <div id="flight" className="flightStuff" key={index}>

                        <div id="FlightLeft">
                        <Button variant="light" onClick={(e)=>this.remove(index)}>
                        <FiX />
                        </Button>
                        </div>
                         <h6>Flight Name</h6>
                        <input onChange={(e)=>this.handleChange(e,index)} value={flight}></input>
                        <h6>Flight Date</h6>
                        <input type="date"/>
                        <h6>Flight Time</h6>
                        <input type="time"/>
                     </div>
                 )   

            })
        }

        <hr></hr>
        <button onClick={(e)=>this.addFlight(e)}> Add Flight </button>

        </div>    
    );
    }   


}
export default Plane;