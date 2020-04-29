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
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import fire from "./config/fire";
import bootbox from "bootbox";

const popInfo = (
  <Popover id="popover-basic">
    <Popover.Content>View user submitted information</Popover.Content>
  </Popover>
);

class Attractions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: this.props.location,
      category: this.props.category,
      attractions: [],
      userVals: [],
			userRetreived: false,
			userValsRating: [],
			userRetreivedRating: false
    };

    this.showUserInfo = this.showUserInfo.bind(this);
    this.getUserRatings = this.getUserRatings.bind(this);
    this.getUserSubmissions = this.getUserSubmissions.bind(this);
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
            limit: 8,
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
  showUserInfo(name, id) {
		var hasTime = false;
		var hasRating = false;
		var timeAvg = "?";
		var ratingAvg = "?";

		for(var i in this.state.userVals) {
			var r = this.state.userVals[i];
			if(r.id === id) {
				timeAvg = r.avgTime/r.numTime;
				hasTime = true;
			}
		}

		for(var i in this.state.userValsRating) {
			var r = this.state.userValsRating[i];
			if(r.id === id) {
				ratingAvg = r.ratingSum/r.ratingNum;
				hasRating = true;
			}
		}

		var message;
		if(!hasTime && !hasRating) {
			message = name + " does not have any user submitted information";
		}
		else {
			message = "Average time user spent at " + name + ": " + timeAvg + " hours" + 
						"<br/>" + 
						"Average user rating: " + ratingAvg + "/10";
		}

		bootbox.alert({
			message: message,
			backdrop: true
		});
  }
  getUserSubmissions() {
		//console.log("getting user submissions");
		if(!this.state.userRetreived) {

			fire.database()
				.ref('userSubmissions')
				.on("value", snapshot=> {
					if(snapshot.val()) {
						let currentstate = this;
					
						const values = snapshot.val();
						var keyList = Object.keys(values);

						for(var k in keyList) {
							var key = keyList[k];
							var item = values[keyList[k]];

							//create object
							var val = {
								key: key,
								id: item.id,
								avgTime: item.avgTime,
								numTime: item.numTime
							}

							currentstate.setState( {
								userVals: [...currentstate.state.userVals,  val]
							})
						}

					}
				})
		
			this.state.userRetreived = true;
			console.log("GOT TIME !!!")
		}
		
  }
  getUserRatings() {
		//console.log("getting user ratings");
		if(!this.state.userRetreivedRating) {

			fire.database()
				.ref('userRatings')
				.on("value", snapshot=> {
					if(snapshot.val()) {
						let currentstate = this;
					
						const values = snapshot.val();
						var keyList = Object.keys(values);

						for(var k in keyList) {
							console.log("key in keylist = " + keyList[k]);

							var key = keyList[k];
							var item = values[keyList[k]];

							//create object
							var val = {
								key: key,
								id: item.id,
								ratingSum: item.ratingSum,
								ratingNum: item.ratingNum
							}

							currentstate.setState( {
								userValsRating: [...currentstate.state.userValsRating,  val]
							})
						}

					}
				})
		
			this.state.userRetreivedRating = true;
			console.log("GOT rating !!!")
		}
		
	}
  addAttraction(name, id) {
    let curr = this;

    bootbox.prompt({
      title: "How long are you planning on spending at " + name + "?",
      inputType: "number",
      callback: function (duration) {
        bootbox.prompt({
          title: "What day will you attend " + name + "?",
          inputType: "date",
          callback: function (date) {
            var added = {
              name: name,
              id: id,
              time: duration,
              date: date
            };
    
            curr.props.addedAttraction(added);
          },
        });
      },
    });
  }

  render() {
    let statenow = this;
    const curr = this;

    fire.auth().onAuthStateChanged( function(user) {
			if (user) {
			statenow.getUserSubmissions();
			statenow.getUserRatings();
		}})

    if (this.state.category == "") {
      return (
        <div className="attractions">
          <h1>Enter a category</h1>
        </div>
      );
    } else {
      return (
        <div className="attractions">
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
                        width: "14rem",
                        marginRight: "1rem",
                        // height: "37rem",
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
                        {/* <Card.Text as="h4">
                          Rating: {attraction.popularity}/5
                        </Card.Text> */}

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

                        <OverlayTrigger
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
                        </OverlayTrigger>
                      </Card.Body>

                      <Card.Footer as="h3">{attraction.address}</Card.Footer>
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
