import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import fire from './config/fire'
import { DropdownButton, InputGroup, Dropdown, Form, FormControl, Button } from 'react-bootstrap';
import bootbox from 'bootbox';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.onNavigateHome = this.onNavigateHome.bind(this);

        this.state = {
          value: '',
          category: 'Attractions',
          customCategory: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategorychange = this.handleCategorychange.bind(this);
        this.onCustomCategory = this.onCustomCategory.bind(this);
        
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
    handleCategorychange(event) {
      this.setState({category: event.target.category});
    }
    onCustomCategory() {
      const curr = this;
      bootbox.prompt({
        title: "Enter a category", 
        centerVertical: true,
        callback: function(result){ 
          curr.setState({category: result});
        }
      });
    }
  
    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
   

    render() {
      const curr = this;
      return (
        <div className="home">
          <div id="three" className="col">
          
            <h3>P E R T R E K</h3>
            <h2>YOUR PERFECT VACATION STARTS HERE</h2>


            {/* <Form onSubmit={this.handleSubmit} className="searchBar">
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Enter city" value={this.state.value} onChange={this.handleChange} />
                
                <Form.Text className="text-muted">
                  Enter a city, address, or zipcode
                </Form.Text>
                
              </Form.Group>
              <Link to={{
                    pathname: "/scheduler/" + this.state.value,
                  }}><Button variant="secondary" value="Submit" type="submit">Search</Button>
              </Link>
              
            </Form> */}

            <InputGroup onSubmit={this.handleSubmit}>
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title={curr.state.category}
                id="input-group-dropdown-2"
                onSelect={
                  function(evt){
                    curr.setState({category: evt});
                  }
                }
              >
                <Dropdown.Item eventKey="Restaurants">Restaurants</Dropdown.Item>
                <Dropdown.Item eventKey="Attractions">Attractions</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={this.onCustomCategory}>
                  Custom
                </Dropdown.Item>
              </DropdownButton>

              <Form.Control type="text" placeholder="Enter city" value={this.state.value} onChange={this.handleChange} />

              <Link to={{
                    pathname: "/scheduler/" + this.state.category + "/" + this.state.value,
                    // pathname: "/" + this.state.category,
                  }}><Button variant="secondary" value="Submit" type="submit">Search</Button>
              </Link>

            </InputGroup>

          </div>

          
        </div>
      );
    }
  }
  export default Home;