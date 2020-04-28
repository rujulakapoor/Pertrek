import React, { Component } from "react";
import {
  Card,
  Button,
  Accordion,
  Tooltip,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faClock,
  faPen,
  faInfo,
  faStar,
  faMap,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import fire from "./config/fire";
import bootbox from "bootbox";

const popInfo = (
	<Popover id="popover-basic">
	  <Popover.Content>
		View user submitted information
	  </Popover.Content>
	</Popover>
);

class Attractions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Chicago, IL",
      category: this.props.category,
      attractions: [],
    };
  }
  componentDidUpdate() {
    //console.log("what is happening");
    console.log("updated = " + this.props.category);
    if (this.state.category !== this.props.category) {
      this.setState({ category: this.props.category });

      //5clear attraction list
      this.setState({ attractions: [] });

      console.log("starting");

      var token =
        "Bearer zyPWG_QxvokChwb3lHLU8wvzWLEWq8SlvpPwr1I_yE9izq4aonvbf6XTlM7JkhqA7uPbKqorBa-0H67-9djEePPUE5JWAgBUloI5s9blpLpDD_70Qo2M1Bz61Iw3XnYx";
      var yelp_search_url =
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
      const state = this.state;

      const axios = require("axios");

      //GET attractions
      axios
        .get(yelp_search_url, {
          headers: {
            Authorization: token,
          },
          params: {
            term: this.props.category,
            location: this.state.location,
            limit: 5,
          },
        })
        .then(
          function (response) {
            console.log(
              "i'm in hell = " + response.data.businesses[0].categories[0].title
            );

            for (var a in response.data.businesses) {
              var obj = response.data.businesses[a];
              var address =
                obj.location.address1 +
                "," +
                obj.location.city +
                "," +
                obj.location.zip_code;
              var description =
                obj.name +
                " offers " +
                obj.categories[0].title +
                ". Call for more information at: " +
                obj.phone; //TODO: list all categories
              var priceVal = "";
              var mapSrc =
                "https://www.google.com/maps/embed/v1/view?zoom=17&center=" +
                obj.coordinates.latitude +
                "%2C" +
                obj.coordinates.longitude +
                "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";

              if (obj.price === undefined) {
                priceVal = "free!";
              } else {
                priceVal = obj.price;
              }

              var atr = {
                name: obj.name,
                price: priceVal,
                popularity: obj.rating,
                image: obj.image_url,
                address: address,
                description: description,
                map: mapSrc,
                id: obj.id,
              };

              this.setState({ attractions: [...this.state.attractions, atr] });
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  addAttraction(name, id) {

  }


  render() {
    let statenow = this
    const curr = this;
    if (this.state.category == "") {
      return (
        <div className="planner">
          <p>Search a location</p>
        </div>
      );
    } else {
      return (
        <div className="planner">
          <h1>
            {statenow.state.category} in {statenow.state.location}
          </h1>

          <div className="row">
            <div className="col-xl-12">
              {this.state.attractions //COLLECTION NAME
                .map((attraction) => (
                  <Accordion defaultActiveKey="0">
                    <Card
                      key={attraction.id}
                      className="float-left"
                      style={{
                        width: "18rem",
                        marginRight: "1rem",
                        height: "40rem",
                        margin: "15px",
                      }}
                    >
                      <Card.Header as="h5">{attraction.name}</Card.Header>
                      <Card.Img
                        variant="top"
                        src={attraction.image}
                        className="card-img"
                      />

                      <Card.Body>
                        <Card.Text as="h4">Cost: {attraction.price}</Card.Text>
                        <Card.Text as="h4">
                          Rating: {attraction.popularity}/5
                        </Card.Text>

                        <Card.Text as="h4">
                          <StarRatings
                            rating={attraction.popularity}
                            starDimension="15px"
                            starSpacing="2px"
                            starRatedColor="rgb(245, 214, 44)"
                          />
                        </Card.Text>

                        <Card.Text as="p">{attraction.description}</Card.Text>

                        <Button
                            variant="outline-secondary"
                            onClick={() =>
                                this.addAttraction(attraction.name, attraction.id)
                              }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>

                        {/* <OverlayTrigger
                          key="info"
                          placement="top"
                          overlay={popInfo}
                        >
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              this.showUserInfo(attraction.name, attraction.id)
                            }
                          >
                            <FontAwesomeIcon icon={faInfo} />
                          </Button>
                        </OverlayTrigger> */}


                      </Card.Body>

                    </Card>
                  </Accordion>
                ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Attractions;
