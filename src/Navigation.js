import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class Navigation extends React.Component {
    render() {
      return (
        <Navbar bg="light" expand="lg" className="nav-bar">
            <Navbar.Brand href="#home">Pertrek</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href=".">Home</Nav.Link>
                <Nav.Link href="./planner">Planner</Nav.Link>
            </Nav>
            <Form inline>
                <NavDropdown title="Hello, ______" id="basic-nav-dropdown" className="dropdown">
                  <NavDropdown.Item href="./account" >Account Details</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={this.props.value}>Sign Out</NavDropdown.Item>
                </NavDropdown>
            </Form>
            </Navbar.Collapse>
         </Navbar>

      );
    }
  }


export default Navigation