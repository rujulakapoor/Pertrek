import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import fire from './config/fire'
import { DropdownButton, InputGroup, Dropdown, Form, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import bootbox from 'bootbox';
import slide1 from './img/new-zealand.jpg';
import slide2 from './img/rough-sea-waves.jpg';
import slide3 from './img/cape-town-cropped.jpg';
import banner from './img/banner.png';
import bg from './img/pertrek_home_bg.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-awesome-slider/dist/styles.css';
import AwesomeSlider from 'react-awesome-slider';

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
      event.preventDefault();
    }
   

    render() {
      const curr = this;
      return (
        <div className="home">

          <div className="carousel-container">
            <AwesomeSlider
                  bullets={false}
                  fillParent={true}
              >
                  <div data-src={slide1} />
                  <div data-src={slide2} />
                  <div data-src={slide3}/>
            </AwesomeSlider>
            
            {/* <Carousel showThumbs={false} showStatus={false} dynamicHeight={true}>
                <div>
                    <img src={slide1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={slide2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={slide3} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel> */}

            <div className="main-text">
              <h3>P E R T R E K</h3>
              <h2>YOUR PERFECT VACATION STARTS HERE</h2>
              <Button href="#anchor" style={{color: "#FFF",backgroundColor: "#FF5E5B", borderColor: "#FFF", marginLeft: "48%"}} >Get Started</Button>
            </div>
          </div>

          <div className="banner">
            <img src={banner} />

          </div>

          <div className="options">
          <Container fluid id="anchor" style={{width:"100%"}}>
            <Row>
              <Col xs={6} style={{ padding:"5%", paddingTop: "15%", paddingBottom: "15%"}}>
                <h4 style={{ color:"#FF5E5B" }}>Explore</h4>
                
                <InputGroup onSubmit={this.handleSubmit} style={{ width:"100%" }}>
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

                  <Form.Control type="text" placeholder="Enter city, address, or zip code" value={this.state.value} onChange={this.handleChange} />

                  <Link to={{
                        pathname: "/scheduler/" + this.state.category + "/" + this.state.value,
                      }}><Button variant="secondary" value="Submit" type="submit">Search</Button>
                  </Link>

                </InputGroup>

              </Col>
              <Col xs={6} style={{ padding:"5%", paddingTop: "15%", paddingBottom: "15%"}}>
                <h4 style={{ color:"#FFFFEA" }}>Create</h4>
              </Col>
            </Row>
          </Container>
          </div>

          
        </div>

          
      );
    }
  }
  export default Home;