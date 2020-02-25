//search endpoint url
//GET https://api.yelp.com/v3/businesses/search

//QUERY STRING
//?term=restaurants%location=92967

import React, { Component } from 'react';
import { $CombinedState } from 'redux';
import { Card, Button } from 'react-bootstrap';


class scheduler extends Component {
	constructor(props) {
		super(props);

		var url = window.location.href;
		var cityName = url.substring(url.lastIndexOf("/")+1, url.length);
		console.log("cityName = " + cityName);

		this.state = {
			restaurants: [],
			freeAttractions: [],
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
					var description = obj.name + " is a restaurant that offers " + obj.categories[0].title; //TODO: list all categories
					
					var restaurant = {
						name: obj.name,
						price: obj.price,
						popularity: obj.rating,
						image: obj.image_url,
						address: address,
						description: description,
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

			//GET FREE ATTRACTIONS
			axios.get(yelp_search_url, {
				headers: {
						Authorization: token
				},
				params: {
						term:'free',
						location: this.state.citySelect
				}
				})
				.then(function (response) {	
					for(var a in response.data.businesses){
						var obj = response.data.businesses[a];
						var address = obj.location.address1 + ", " + obj.location.city + ", " + obj.location.zip_code;
						var description = obj.name + " is categorized as " + obj.categories[0].title; //TODO: list all categories
						
						var attraction = {
							name: obj.name,
							price: obj.price,
							popularity: obj.rating,
							image: obj.image_url,
							address: address,
							description: description,
							id: obj.id
						}
	
						this.setState({ freeAttractions: [...this.state.freeAttractions, attraction] });
					}
				}.bind(this))
				.catch(function (error) {
					console.log(error);
				})
				.then(function() {
					console.log("done");

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
						var address = obj.location.address1 + ", " + obj.location.city + ", " + obj.location.zip_code;
						var description = obj.name + " is categorized as " + obj.categories[0].title; //TODO: list all categories
						
						var attraction = {
							name: obj.name,
							price: obj.price,
							popularity: obj.rating,
							image: obj.image_url,
							address: address,
							description: description,
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
							<Card key={attraction.id} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
								<Card.Header as="h5">{ attraction.name }</Card.Header>
								<Card.Img variant="top" src={ attraction.image } />

								<Card.Body>
									<Card.Text as="h4">
										Cost: ${ attraction.price }
									</Card.Text>
									{/* <Card.Text as="h4">
										Estimated duration: { attraction.duration } hours
									</Card.Text> */}
									<Card.Text as="h4">
										{ attraction.popularity } reviews
									</Card.Text>
									<Card.Text as="p">
										{ attraction.description }
									</Card.Text>
									<Button variant="secondary">Add</Button>
								</Card.Body>

								<Card.Footer as="h3">
									{ attraction.address }
								</Card.Footer>

							</Card>

							)
						} 
					</div>
				</div>

				<div className="row">
					<div className='col-xl-12'>
						<h1>Free Attractions</h1>
					</div>
				</div>

				<div className='row'>
					<div className='col-xl-12'>
						{  
						this.state.freeAttractions //COLLECTION NAME
						.map(attraction => 
							<Card key={attraction.id} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
								<Card.Header as="h5">{ attraction.name }</Card.Header>
								<Card.Img variant="top" src={ attraction.image } />

								<Card.Body>
									<Card.Text as="h4">
										Cost: ${ attraction.price }
									</Card.Text>
									{/* <Card.Text as="h4">
										Estimated duration: { attraction.duration } hours
									</Card.Text> */}
									<Card.Text as="h4">
										{ attraction.popularity } reviews
									</Card.Text>
									<Card.Text as="p">
										{ attraction.description }
									</Card.Text>
									<Button variant="secondary">Add</Button>
								</Card.Body>

								<Card.Footer as="h3">
									{ attraction.address }
								</Card.Footer>

							</Card>

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
							<Card key={attraction.id} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
								<Card.Header as="h5">{ attraction.name }</Card.Header>
								<Card.Img variant="top" src={ attraction.image } />

								<Card.Body>
									<Card.Text as="h4">
										Cost: ${ attraction.price }
									</Card.Text>
									{/* <Card.Text as="h4">
										Estimated duration: { attraction.duration } hours
									</Card.Text> */}
									<Card.Text as="h4">
										{ attraction.popularity } reviews
									</Card.Text>
									<Card.Text as="p">
										{ attraction.description }
									</Card.Text>
									<Button variant="secondary">Add</Button>
								</Card.Body>

								<Card.Footer as="h3">
									{ attraction.address }
								</Card.Footer>

							</Card>

							)
						} 
					</div>
				</div>
				
			</div>
		);
	}
}
export default scheduler;