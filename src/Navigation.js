import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import fire from './config/fire'

var user = fire.auth().currentUser;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    }    
  }
  componentDidMount() {
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log('This is the user: ', user)
          this.setState({
            name: user.email
          });
      } else {
          // No user is signed in.
          console.log('There is no logged in user');
      }
    });
  }
  getInfo = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      this.state.name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    
  }
    render() {
      return (
        <Navbar bg="light" expand="lg" className="nav-bar">
            <Navbar.Brand><Link to="/" style={{ textDecoration: 'none' }}><h4>Pertrek</h4></Link></Navbar.Brand>            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="."><h5>Home</h5></Nav.Link>
                <Nav.Link href="./planner"><h5>Planner</h5></Nav.Link>
                <Nav.Link href="./savedpage"><h5>My Itineraries </h5> </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="dropdown">
                <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="./planner"><h5>Planner</h5></Nav.Link> */}
            </Nav>
            <Form inline>
                {/* <div id="left"> <Button variant="secondary">
                  <Nav>
                    <Nav.Link href="./itform"><h5>New Itinerary</h5></Nav.Link>
                  </Nav>
                </Button>
                </div> */}

                <div id="left"><Button variant="secondary" href='./itform'>New Itinerary</Button></div>

                <NavDropdown title="Hello, ______" id="basic-nav-dropdown" className="dropdown">
                  <NavDropdown.Item href="./account" >Account Details</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={this.props.value}>Sign Out</NavDropdown.Item>
                </NavDropdown>

                <div id="left"><Button variant="secondary" onClick={this.onNavigateHome}>Log in</Button></div>
                <div id="left"><Button variant="dark" onClick={this.props.value}>Log out</Button></div>

            </Form>
            </Navbar.Collapse>
         </Navbar>

      );
    }
  }


export default Navigation
