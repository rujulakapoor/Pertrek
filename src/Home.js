import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import fire from './config/fire'
//import 'bootstrap/dist/css/bootstrap.min.css';
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
          
           <body >
           <Navbar bg="light" expand="lg" className="nav-bar">
              <Navbar.Brand href="#home">Pertrek</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href=".">Home</Nav.Link>
                  <Nav.Link href=".">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="dropdown">
                    <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form inline>
                  <div id="left"><button onClick={this.logout}>Log in</button></div>
                  <div id="left"><button onClick={this.onNavigateHome}>Log IIn</button></div>
                </Form>
              </Navbar.Collapse>
            </Navbar>
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

            <Link to='/planner'>
              <button className = "btn btn-lg btn-primary">Plan</button>
            </Link>
        </div>
          </div>
          </body>
        );
      }
    }
    export default Home;