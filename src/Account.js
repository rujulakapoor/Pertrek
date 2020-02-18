import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import fire from './config/fire'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class Account extends Component {
    constructor(props) {
      super(props);
        
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }

    render() {
      return (
        <div className="Account">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
        <section id="container">
        <div id="accountone">
        <div id="icon">  
        <i class="fas fa-user-circle fa-10x"></i>
        
        <h3>Welcome</h3> 
        </div>
        <div>  
        <h2>Name From Database</h2> 
        </div>
        
        <div>  
        <i class="fas fa-home fa-2x"></i>
        <Link to='/' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12">Home</span> </Link>
        </div>

        <div>  
        <i class="fas fa-plus-circle fa-2x"></i> 
        <Link to='/planner' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12" >Create New</span></Link>
        </div>

        <div>  
        <i class="fas fa-cog fa-2x"></i>
        <Link to='/forgot' style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Settings</span> </Link>
        </div>

        <div>  
        <i class="fas fa-key fa-2x"></i>
        <Link to='/forgot' style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Reset Password</span> </Link>
        </div>
        

        </div>

        <div id="accounttwo"> 
        <div id="move">  
        <h1>Active Itinerary</h1> 
        </div>   
        </div>
        </section> 
        </div>
      );
    }
    }
    export default Account;