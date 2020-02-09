import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Navigation from './Navigation'
import fire from './config/fire'


class Planner extends Component {
    constructor(props) {
      super(props);
        
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }

    render() {
      return (
        <body >

          <div className="container">

            <p>Planner</p>

          </div>
      </body>
      );
    }
    }
    export default Planner;