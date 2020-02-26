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

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    logout() {
        fire.auth().signOut();
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
   

    render() {
        return (
          <div className="home">
           <div id="three" className="col">
           
              <h3>P E R T R E K</h3>
              <h2>YOUR PERFECT VACATION STARTS HERE</h2>

              {/* <div class="dropdown">

                <button class="dropbtn">Select A Destination</button>
                <div class="dropdown-content">
                  <Link to={{
                      pathname: "/scheduler/Seattle,WA",
                      state: {
                        dbName: true
                      }
                    }}>
                      Seattle
                    </Link>
                  <Link to={{
                    pathname: "/scheduler/Chicago,IL",
                    state: {
                      dbName: true
                    }
                  }}>
                    Chicago
                  </Link>
                  <a href="#">Cincinnati</a>
                </div>
                
              </div>        */}


              <Form onSubmit={this.handleSubmit} className="searchBar">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter city" value={this.state.value} onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                    Enter a city, address, or zipcode
                  </Form.Text>
                </Form.Group>
                {/* <label>
                  <input type="text" placeholder="Enter city" value={this.state.value} onChange={this.handleChange} />
                </label> */}
                <Link to={{
                      pathname: "/scheduler/" + this.state.value,
                    }}><Button variant="secondary" value="Submit" type="submit">Search</Button>
                </Link>
                
              </Form>

            </div>

            
          </div>
        );
      }
    }
    export default Home;