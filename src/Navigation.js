import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import fire from './config/fire';
import logo from './img/logo_airplane.png';
import logoSquare from './img/airplane-logo-red-square.png';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "Account"
    }
  }
  componentDidMount() {
    this.getInfo();
    /*
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
    */
  }
  getInfo = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      this.state.name = user.displayName;
      this.state.email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }

  }
    render() {
      return (
        <Navbar expand="lg" className="nav-bar">
          <Navbar.Brand href="/">
            <img
              src={ logoSquare }
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="Pertrek logo"
            />{' '}
              Pertrek
          </Navbar.Brand>

            <Nav className="mr-auto">
                {/* <Nav.Link href="./planner">Planner</Nav.Link>
                <Nav.Link href="./savedpage">My Itineraries</Nav.Link> */}
            </Nav>

            <Form inline>

                <Link to={{ pathname: "/itform" }}>
                  <Button variant="secondary">New Itinerary</Button>
                </Link>
                <NavDropdown title={this.state.email} id="basic-nav-dropdown" className="dropdown" style={{marginRight:"40px", color:"#FF5E5B"}}>
                  <NavDropdown.Item><Link to="/account" style={{color:"#404040", textDecoration:"none"}}>Account Details</Link></NavDropdown.Item>
                  <NavDropdown.Item ><Link to="/favorites" style={{color:"#404040", textDecoration:"none"}}>My Favorites</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={this.props.value}>Sign Out</NavDropdown.Item>
                </NavDropdown>

                {/* <div id="left"><Button variant="outline-secondary" onClick={this.onNavigateHome}>Log in</Button></div>
                <div id="left"><Button variant="outline-dark" onClick={this.props.value}>Log out</Button></div> */}

            </Form>
         </Navbar>

      );
    }
  }


export default Navigation
