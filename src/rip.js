import React, { Component } from 'react';
import { Form, Button, Dropdown, InputGroup, DropdownButton } from 'react-bootstrap';
import bootbox from 'bootbox';
import Attractions from './Attractions.js';


class Rip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            category: ''
        }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCustomCategory = this.onCustomCategory.bind(this);
        this.getTime = this.getTime.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
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
        event.preventDefault();
        console.log("hi");
    }
    search() {
        console.log("what");
    }
    getTime(val){
        console.log("DATA RECEIVED = " + val.name + " , time = " + val.time);

    }
      
    render() { 
        const curr = this;
        return (
            <div className="rip">
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

                {/* <Form.Control type="text" placeholder="Enter city, address, or zip code" value={this.state.value} onChange={this.handleChange} style={{margin:"auto"}}/>

                <Button variant="secondary" value="Submit" type="submit">Search</Button> */}

                <Attractions category={curr.state.category} location={curr.state.location} addedAttraction={this.getTime}/>
            </div>
        );
  }
}
  
export default Rip;