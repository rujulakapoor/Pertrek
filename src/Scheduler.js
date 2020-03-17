import React, { Component } from 'react';
import { $CombinedState } from 'redux';
import { Card, Button, Accordion } from 'react-bootstrap';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'


class scheduler extends Component {
	constructor(props) {
		super(props);

		var url = window.location.href;
		var cityName = url.substring(url.lastIndexOf("/")+1, url.length);
		console.log("cityName = " + cityName);

		this.state = {
			restaurants: [],
			freeAttractions: [],
			usedAttractions: [],
			attractions: [],
			citySelect: cityName
		}

	}
	componentDidMount() {
		console.log("starting");

		var token = 'Bearer zyPWG_QxvokChwb3lHLU8wvzWLEWq8SlvpPwr1I_yE9izq4aonvbf6XTlM7JkhqA7uPbKqorBa-0H67-9djEePPUE5JWAgBUloI5s9blpLpDD_70Qo2M1Bz61Iw3XnYx';
		var yelp_search_url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
		const state = this.state;

		var requestObj = {
			url: yelp_search_url,
			data: {term:'restaurants', location: '92697'},
			headers: {'Authorization': token},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('AJAX error, jqKHR = ', jqXHR, ', textStatus = ', textStatus, ', errorThrown = ', errorThrown)
			}
		}


		const axios = require('axios');

		//GET RESTAURANTS
		axios.get(yelp_search_url, {
			headers: {
					Authorization: token
			},
			params: {
					term:'restaurants',
					location: this.state.citySelect
			}
			})
			.then(function (response) {
				// console.log("typeof response = " + typeof response);
				// console.log("response = " + response.data);
				// for(var a in response.data.businesses){
				// 	//console.log("life sucks " + a);
				// }
				// console.log("businesses = " + response.data.businesses)
				console.log("i'm in hell = " + response.data.businesses[0].categories[0].title)

				for(var a in response.data.businesses){
					var obj = response.data.businesses[a];
					var address = obj.location.address1 + "," + obj.location.city + "," + obj.location.zip_code;
					var description = obj.name + " is a restaurant that offers " + obj.categories[0].title + ". Call for more information at: " + obj.phone; //TODO: list all categories
					var priceVal = '';
					var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=" + obj.coordinates.latitude + "%2C" + obj.coordinates.longitude + "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";
					//console.log("lat = " + obj.coordinates.latitude + "long" + obj.coordinates.longitude);
					//console.log(mapz);
					//var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=41.8841%2C-87.6480&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";
					
					// var mapProp= {
					// 	center:new google.maps.LatLng(obj.latitude,obj.longitude),
					// 	zoom:5,
					//   };
					// var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

					if(obj.price == undefined) {
						priceVal = "$";
					}
					else {
						priceVal = obj.price;
					}


					var restaurant = {
						name: obj.name,
						price: priceVal,
						popularity: obj.rating,
						image: obj.image_url,
						address: address,
						description: description,
						map: mapSrc,
						id: obj.id
					}

					this.setState({ restaurants: [...this.state.restaurants, restaurant] });
					// var joined = this.state.restaurants.concat(restaurant);
					// this.setState({ restaurants: joined });
				}
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			})
			.then(function() {
				console.log("done");

				//check restaurants state
				// console.log("check");
				// for(var i in this.state.restaurants) {
				// 	var r = this.state.restaurants[i];
				// 	console.log(i + " = " + r.name + ", " + r.description);
				// }
			}.bind(this));

			//GET ATTRACTIONS
			axios.get(yelp_search_url, {
				headers: {
						Authorization: token
				},
				params: {
						term:'attractions',
						location: this.state.citySelect
				}
				})
				.then(function (response) {
					for(var a in response.data.businesses){
						var obj = response.data.businesses[a];
						var priceVal = '';
						var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=" + obj.coordinates.latitude + "%2C" + obj.coordinates.longitude + "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";

						if(obj.price == undefined) {
							//free!!
							priceVal = "free!";
						}
						else {
							priceVal = obj.price;
						}

						var address = obj.location.address1 + ", " + obj.location.city + ", " + obj.location.zip_code;
						var description = obj.name + " is categorized as " + obj.categories[0].title + ". Call for more information at: " + obj.phone; //TODO: list all categories

						var attraction = {
							name: obj.name,
							price: priceVal,
							popularity: obj.rating,
							image: obj.image_url,
							address: address,
							description: description,
							map: mapSrc,
							id: obj.id
						}

						this.setState({ attractions: [...this.state.attractions, attraction] });

					}
				}.bind(this))
				.catch(function (error) {
					console.log(error);
				})
				.then(function() {
					//get rid of free attractions
					// for(var i in this.state.attractions) {
					// 	var attID = this.state.attractions[i].id;

					// 	console.log("comparing " + attID )
					// 	if(this.state.usedAttractions.includes(attID)) {
					// 		console.log("duplicate!");
					// 	}

					// 	// this.setState({attractions: this.state.attractions.filter(function(attractions) {
					// 	// 	return attractions !== attID
					// 	// })});

					// }


					console.log("done");

				}.bind(this));

	}


	render() {
		return (
			<div className="planner">

				<div className="row">
					<div className='col-xl-12'>
						<h1>Restaurants</h1>
					</div>
				</div>


				<div className='row'>
					<div className='col-xl-12'>
						{
						this.state.restaurants //COLLECTION NAME
						.map(attraction =>
							<Accordion defaultActiveKey="0">
								<Card key={attraction.id} className="float-left" style={{width: '18rem', marginRight: '1rem', height: '40rem', margin:'15px'}}>
									<Card.Header as="h5">{ attraction.name }</Card.Header>
									<Card.Img variant="top" src={ attraction.image } className="card-img"/>

									<Card.Body>
										<Card.Text as="h4">
											Cost: { attraction.price }
										</Card.Text>
										{/* <Card.Text as="h4">
											Estimated duration: { attraction.duration } hours
										</Card.Text> */}
										<Card.Text as="h4">
											Rating: { attraction.popularity }/5
										</Card.Text>

										<Card.Text as="h4">
											<StarRatings
												rating={ attraction.popularity }
												starDimension="15px"
												starSpacing="2px"
												starRatedColor="rgb(245, 214, 44)"
											/>
										</Card.Text>

										<Card.Text as="p">
											{ attraction.description }
										</Card.Text>

										<Button variant="outline-success"><FontAwesomeIcon icon={faPlus} /></Button>
										<Button variant="outline-danger"><FontAwesomeIcon icon={faHeart} /></Button>

									</Card.Body>

									<Card.Header>
										<Accordion.Toggle as="h2" variant="link" eventKey="1">
											{ attraction.address }
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											<iframe width="100%" frameBorder="0" src={attraction.map}></iframe>
										</Card.Body>
									</Accordion.Collapse>

								</Card>
							</Accordion>

							)
						}
					</div>
				</div>


				<div className="row">
					<div className='col-xl-12'>
						<h1>Attractions</h1>
					</div>
				</div>

				<div className='row'>
					<div className='col-xl-12'>
						{
						this.state.attractions //COLLECTION NAME
						.map(attraction =>
							<Accordion defaultActiveKey="0">
								<Card key={attraction.id} className="float-left" style={{width: '18rem', marginRight: '1rem', height: '40rem', margin:'15px'}}>
									<Card.Header as="h5">{ attraction.name }</Card.Header>
									<Card.Img variant="top" src={ attraction.image } className="card-img"/>

									<Card.Body>
										<Card.Text as="h4">
											Cost: { attraction.price }
										</Card.Text>
										{/* <Card.Text as="h4">
											Estimated duration: { attraction.duration } hours
										</Card.Text> */}
										<Card.Text as="h4">
											Rating: { attraction.popularity }/5
										</Card.Text>

										<Card.Text as="h4">
											<StarRatings
												rating={ attraction.popularity }
												starDimension="15px"
												starSpacing="2px"
												starRatedColor="rgb(245, 214, 44)"
											/>
										</Card.Text>

										<Card.Text as="p">
											{ attraction.description }
										</Card.Text>
										<Button variant="secondary">Add</Button>
										<Button variant="outline-danger"><FontAwesomeIcon icon={faHeart} /></Button>
									</Card.Body>

									<Card.Header>
										<Accordion.Toggle as="h2" variant="link" eventKey="1">
											{ attraction.address }
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											<iframe width="100%" frameBorder="0" src={attraction.map}></iframe>
										</Card.Body>
									</Accordion.Collapse>

								</Card>
							</Accordion>

							)
						}
					</div>
				</div>

			</div>
		);
	}
}
export default scheduler;
