import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import fire from './config/fire'
import { DropdownButton, InputGroup, Dropdown, Form, FormControl, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import bootbox from 'bootbox';
import slide1 from './img/cape-town-cropped.jpg';
import slide2 from './img/mexico.jpg';
import slide3 from './img/flowers.jpg';
import banner from './img/banner-shifted.png';
import dragon from './img/Dragon-Boat.png'
import planning from './img/planning-light-square.jpg';
import suitcase from './img/suitcase-square.jpg';
import bg from './img/pertrek_home_bg.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-awesome-slider/dist/styles.css';
import AwesomeSlider from 'react-awesome-slider';
import Footer from './Footer.js';

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


            <div className="main-text" id="#top">
              <h2>Where's your dream destination?</h2>
              {/* <Button href="#anchor" style={{color: "#FFF",backgroundColor: "#FF5E5B", borderColor: "#FFF", marginLeft: "48%"}} >Get Started</Button> */}
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

                  <Form.Control type="text" placeholder="Enter city, address, or zip code" value={this.state.value} onChange={this.handleChange} style={{margin:"auto"}}/>

                  <Link to={{
                        pathname: "/scheduler/" + this.state.category + "/" + this.state.value,
                      }}><Button variant="secondary" value="Submit" type="submit">Search</Button>
                  </Link>

                </InputGroup>
            </div>
          </div>

          
          

          {/* <div className="options">
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
                <h4 style={{ color:"#FF5E5B" }}>Create</h4>
              </Col>
            </Row>
          </Container>
          </div> */}

          <div className="options">

            <div className="banner">
              <img src={banner} className="ban-img"/>
            </div>

            <CardGroup style={{padding:"30px", marginBottom:"40px"}}>
              <Card>
                <Card.Img variant="top" src={dragon} style={{padding:"20px", borderRadius: "25px"}}/>
                <Card.Body>
                  <Card.Title>Explore</Card.Title>
                  <Card.Text>
                    Use a personalized search to find restaurants, attractions, or other activities around your next vacation spot
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted"><a href="#top">Search a destination</a></small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src={planning} style={{padding:"20px", borderRadius: "25px"}}/>
                <Card.Body>
                  <Card.Title>Plan</Card.Title>
                  <Card.Text>
                    Create an all-encompassing itinerary that will make your vacation stress-free
                    {' '}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted"><Link to="/itform">Create an itinerary</Link></small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img variant="top" src={suitcase} style={{padding:"20px", borderRadius: "25px"}}/>
                <Card.Body>
                  <Card.Title>Store</Card.Title>
                  <Card.Text>
                    Save your created itineraries, favorited events, and other travel preferences to make your next trip even easier to plan
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted"><Link to="/account">View your account details</Link></small>
                </Card.Footer>
              </Card>
            </CardGroup>


          </div>

          <Footer/>
          
        </div>

          
      );
    }
  }
  export default Home;