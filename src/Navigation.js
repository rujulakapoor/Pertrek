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
                <div id="left"><button onClick={this.props.value}>Log in</button></div>
                <div id="left"><button onClick={this.onNavigateHome}>Log IIn</button></div>
            </Form>
            </Navbar.Collapse>
         </Navbar>

      );
    }
  }


export default Navigation