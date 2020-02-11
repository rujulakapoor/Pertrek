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

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.onNavigateHome = this.onNavigateHome.bind(this);
        
    }
    logout() {
        fire.auth().signOut();
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }
   

    render() {
        return (
          <div className="home">
           <div id="three" className="col">
           
              <h3>P E R T R E K</h3>
              <h2>YOUR PERFECT VACATION STARTS HERE</h2>

              <div class="dropdown">

                <button class="dropbtn">Select A Destination</button>
                <div class="dropdown-content">
                  <a href="#">Orlando</a>
                  <Link to='/planner'>Chicago</Link>
                  <a href="#">Cincinnati</a>
                </div>
                
              </div>

            </div>
          </div>
        );
      }
    }
    export default Home;