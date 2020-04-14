import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import fire from "./config/fire";
import bootbox from 'bootbox';
import bootstrap from 'bootstrap';


class scheduler extends Component {
	constructor(props) {
		super(props);
		this.save= this.save.bind(this);
		this.favoriteItem = this.favoriteItem.bind(this);
		this.getAlreadyFaved = this.getAlreadyFaved.bind(this);
		this.deleteFavorite = this.deleteFavorite.bind(this);

		var url = window.location.href;
		var cityName = url.substring(url.lastIndexOf("/")+1, url.length);
		var city = '';
		for(var i = 0; i < cityName.length; i++) {
			var c = cityName.charAt(i);
			if(c != "%") {
				city += c;
			}
			else {
				city += " ";
				i += 2;
			}
		}
		console.log("city = " + city);

		console.log(url.lastIndexOf("scheduler") + 10);
		var category = url.substring(url.lastIndexOf("scheduler") + 10, url.lastIndexOf("/"));
		console.log("category = " + category);


		this.state = {
			restaurants: [],
			freeAttractions: [],
			usedAttractions: [],
			attractions: [],
			favoriteItems: [],
			citySelect: city,
			categorySelect: category,
			alreadysaved: false,
			itkey: null,
			alreadyFaved: [],
			favNames: [],
			favKeys: [],
      		retreived: false,
		}

	}
	componentDidMount() {
		console.log("starting");
		
		var token = 'Bearer zyPWG_QxvokChwb3lHLU8wvzWLEWq8SlvpPwr1I_yE9izq4aonvbf6XTlM7JkhqA7uPbKqorBa-0H67-9djEePPUE5JWAgBUloI5s9blpLpDD_70Qo2M1Bz61Iw3XnYx';
		var yelp_search_url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
		const state = this.state;

		const axios = require('axios');

		//GET RESTAURANTS
		axios.get(yelp_search_url, {
			headers: {
					Authorization: token
			},
			params: {
					term: this.state.categorySelect,
					location: this.state.citySelect,
					limit:15
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
					var description = obj.name + " offers " + obj.categories[0].title + ". Call for more information at: " + obj.phone; //TODO: list all categories
					var priceVal = '';
					var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=" + obj.coordinates.latitude + "%2C" + obj.coordinates.longitude + "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";
					
					if(obj.price === undefined) {
						priceVal = "free!";
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

				}
			}.bind(this))
			.catch(function (error) {
				console.log(error);
			})
			.then(function() {
				//console.log("done");

				//check restaurants state
				//console.log("check");
				// for(var i in this.state.restaurants) {
				// 	var r = this.state.restaurants[i];
				// 	console.log(i + " = " + r.name + ", " + r.description);
				// }
			}.bind(this));

			//GET ATTRACTIONS
			// axios.get(yelp_search_url, {
			// 	headers: {
			// 			Authorization: token
			// 	},
			// 	params: {
			// 			term:'attractions',
			// 			location: this.state.citySelect,
			// 			limit:5
			// 	}
			// 	})
			// 	.then(function (response) {
			// 		for(var a in response.data.businesses){
			// 			var obj = response.data.businesses[a];
			// 			var priceVal = '';
			// 			var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=" + obj.coordinates.latitude + "%2C" + obj.coordinates.longitude + "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";

			// 			if(obj.price == undefined) {
			// 				//free!!
			// 				priceVal = "free!";
			// 			}
			// 			else {
			// 				priceVal = obj.price;
			// 			}

			// 			var address = obj.location.address1 + ", " + obj.location.city + ", " + obj.location.zip_code;
			// 			var description = obj.name + " is categorized as " + obj.categories[0].title + ". Call for more information at: " + obj.phone; //TODO: list all categories

			// 			var attraction = {
			// 				name: obj.name,
			// 				price: priceVal,
			// 				popularity: obj.rating,
			// 				image: obj.image_url,
			// 				address: address,
			// 				description: description,
			// 				map: mapSrc,
			// 				id: obj.id
			// 			}

			// 			this.setState({ attractions: [...this.state.attractions, attraction] });

			// 		}
			// 	}.bind(this))
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	})
			// 	.then(function() {
			// 		//console.log("done");
			// 	}.bind(this));

	}

	save(name, price, popularity, image, address, description) {

		//favorite item
		if(this.state.alreadysaved == false){
			const user = fire.auth().currentUser.uid
			const db = fire.database().ref('favoriteItems/' + user);
			const item = {
			name: name,
			price: price,
			popularity: popularity,
			image: image,
			address: address,
			description: description
		}
  
		  db.push(item
		  ).then(ref => {
		   console.log('Added fav with ID: ', ref.id);
		   //console.log(ref)
		   this.setState({
			 itkey: ref.path.pieces_[2]
		   })
		 });
		 //console.log("save completed?" + item);
		 //console.log(item);
		//  this.setState({
		//    alreadysaved: true
		//  })
	  }
	  else {
		console.log("Already saved")
  
	  }
	}

	favoriteItem(name, price, popularity, image, address, description) {
		console.log("favoriting item");

		//check if this item already favorited
		//console.log("printing faved stuff: length = " + this.state.favNames.length);
		var isFavorited = false;
		var removeIndex = 0;

		for(var i in this.state.favNames) {
			var r = this.state.favNames[i];
			//console.log(i + " = " + r);
			if(r === name) {	//duplicate found
				//console.log("DUPLICATE :(");
				isFavorited = true;
				removeIndex = i;
				break;
			}
		}

		if(!isFavorited) {	//FAVORITE
			this.save(name, price, popularity, image, address, description);
			bootbox.alert({
				size: "small",
				title: "Favorite added",
				message: "<b>" + name + "</b> has been added to your favorites!",
				backdrop: true
			})
		}
		else {	//REMOVE
			bootbox.confirm({
				title: "Failed to add favorite",
				message: "<b>" + name + "</b> has already been favorited. Go to the favorites page to edit your favorites",
				buttons: {
					cancel: {
						label: '<i class="fa fa-times"></i> Cancel',
						className: 'outline-success'
					},
					confirm: {
						label: '<i class="fa fa-check"></i> Take me to my favorites!',
						className: 'outline-dark'
					}
				},
				callback: function (result) {
					if (result) {
						window.location.href = '/favorites';
					}
				}
			});
		}
	}

	deleteFavorite(id) {
		const user = fire.auth().currentUser.uid;
			fire.database()
				.ref('favoriteItems/' + user)
				.child(id[0]).remove();

			this.setState({
				favNames: [],
				favKeys: [],
				retreived: false
			})

			this.getAlreadyFaved();
	}

	getAlreadyFaved() {
		if(this.state.retreived === false ){
			const user = fire.auth().currentUser.uid;
			//console.log("user id = " + user);

			fire.database()
				.ref('favoriteItems/' + user)
				.on("value", snapshot=> {
					if(snapshot.val()) {
						let currentstate = this;
						//console.log("Snapshot = " + snapshot.val());
					
						const values = snapshot.val();
						//console.log(values);
						var keyList = Object.keys(values);
						//console.log(Object.keys(values));
						//console.log("name = " + values[tempkey].name);

						for(var k in keyList) {
							//console.log("key in keylist = " + keyList[k]);
							var key = keyList[k];
							var favName = values[key].name;
							currentstate.setState( {
								favNames: [...currentstate.state.favNames,  favName]
							})
						}

						for(var k in keyList) {
							//console.log("key in keylist = " + keyList[k]);
							var key = keyList[k];
							var favKey = key;
							currentstate.setState( {
								favKeys: [...currentstate.state.favKeys,  favKey]
							})
						}

						// console.log("printing faved stuff: length = " + this.state.favNames.length);
						// for(var i in this.state.favNames) {
						// 	var r = this.state.favNames[i];
						// 	console.log(i + " = " + r);
						// }

					}
				})
		

			this.state.retreived=true;
			console.log("DID IT !!!")
		}
		
	}


	render() {
		let statenow = this

		fire.auth().onAuthStateChanged( function(user) {
			if (user) {
			statenow.getAlreadyFaved();
		}})

		return (
			<div className="planner">

				<h1>{statenow.state.categorySelect} in {statenow.state.citySelect}</h1>

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

										<Button onClick={ () => this.favoriteItem(
																attraction.name, 
																attraction.price, 
																attraction.popularity, 
																attraction.image, 
																attraction.address, 
																attraction.description
															) 
														}										
														variant="outline-danger">
															<FontAwesomeIcon icon={faHeart} />
										</Button>

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


				{/* <h1>Attractions</h1>

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
										<Button onClick={ () => this.favoriteItem(
																attraction.name, 
																attraction.price, 
																attraction.popularity, 
																attraction.image, 
																attraction.address, 
																attraction.description
															) 
														}										
														variant="outline-danger">
															<FontAwesomeIcon icon={faHeart} />
										</Button>
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
				</div> */}

			</div>
		);
	}
}
export default scheduler;
