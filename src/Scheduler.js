import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faClock, faPen, faInfo } from '@fortawesome/free-solid-svg-icons'
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
		this.userTime = this.userTime.bind(this);
		this.getUserSubmissions = this.getUserSubmissions.bind(this);
		this.showUserInfo = this.showUserInfo.bind(this);

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
			userVals: [],
			userRetreived: false,
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
					limit:20
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
			// .then(function() {
			// 	//console.log("done");

			// 	//check restaurants state
			// 	//console.log("check");
			// 	// for(var i in this.state.restaurants) {
			// 	// 	var r = this.state.restaurants[i];
			// 	// 	console.log(i + " = " + r.name + ", " + r.description);
			// 	// }
			// }.bind(this));

			// //GET ATTRACTIONS
			// // axios.get(yelp_search_url, {
			// // 	headers: {
			// // 			Authorization: token
			// // 	},
			// // 	params: {
			// // 			term:'attractions',
			// // 			location: this.state.citySelect,
			// // 			limit:5
			// // 	}
			// // 	})
			// // 	.then(function (response) {
			// // 		for(var a in response.data.businesses){
			// // 			var obj = response.data.businesses[a];
			// // 			var priceVal = '';
			// // 			var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=" + obj.coordinates.latitude + "%2C" + obj.coordinates.longitude + "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";

			// // 			if(obj.price == undefined) {
			// // 				//free!!
			// // 				priceVal = "free!";
			// // 			}
			// // 			else {
			// // 				priceVal = obj.price;
			// // 			}

			// // 			var address = obj.location.address1 + ", " + obj.location.city + ", " + obj.location.zip_code;
			// // 			var description = obj.name + " is categorized as " + obj.categories[0].title + ". Call for more information at: " + obj.phone; //TODO: list all categories

			// // 			var attraction = {
			// // 				name: obj.name,
			// // 				price: priceVal,
			// // 				popularity: obj.rating,
			// // 				image: obj.image_url,
			// // 				address: address,
			// // 				description: description,
			// // 				map: mapSrc,
			// // 				id: obj.id
			// // 			}

			// // 			this.setState({ attractions: [...this.state.attractions, attraction] });

			// // 		}
			// // 	}.bind(this))
			// // 	.catch(function (error) {
			// // 		console.log(error);
			// // 	})
			// // 	.then(function() {
			// // 		//console.log("done");
			// // 	}.bind(this));

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
	getUserSubmissions() {
		console.log("getting user submissions");
		if(!this.state.userRetreived) {

			fire.database()
				.ref('userSubmissions')
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
							console.log("key in keylist = " + keyList[k]);

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

						// for(var k in keyList) {
						// 	//console.log("key in keylist = " + keyList[k]);
						// 	var key = keyList[k];
						// 	var favKey = key;
						// 	currentstate.setState( {
						// 		favKeys: [...currentstate.state.favKeys,  favKey]
						// 	})
						// }

						console.log("printing user stuff: length = " + this.state.userVals.length);
						for(var i in this.state.userVals) {
							var r = this.state.userVals[i];
							console.log(i + "avgtime = " + r.avgTime);
						}

					}
				})
		
			this.state.userRetreived = true;
			console.log("GOT TIME !!!")
		}
		
	}
	userTime(name, id) {
		//check if this attraction already has data
		var hasTime = false;
		var dupKey;
		var dupNum;
		var dupTime;

		for(var i in this.state.userVals) {
			var r = this.state.userVals[i];
			console.log(i + "id = " + r.id);
			if(r.id === id) {
				console.log("ALREADY HAS TIME!");
				dupKey = r.key;
				dupNum = r.numTime;
				dupTime = r.avgTime;
				hasTime = true;
			}
		}

		this.getUserSubmissions();
		var locale = {
			OK: 'I Suppose',
			CONFIRM: 'Go Ahead',
			CANCEL: 'Maybe Not'
		};
					
		bootbox.addLocale('custom', locale);
					
		bootbox.prompt({ 
			title: "How many hours did you spend at " + name + "?", 
			locale: 'custom',
			inputType: 'number',
			callback: function (result) {
				console.log('This was logged in the callback: ' + result);
				console.log("id = " + id);

				if(!hasTime){
					const db = fire.database().ref('userSubmissions');
					const item = {
						id: id,
						numTime: 1,
						avgTime: result
					}
		  
				  db.push(item
				  ).then(ref => {
				   console.log('Added user time with ID: ', ref.id);
				   
				 });
			  }
			  else {
				console.log("Already saved");
				console.log("dup key = " + dupKey);

				const db = fire.database().ref('userSubmissions/' + dupKey);
		
				var newNum = dupNum + 1;
				var newSum = parseInt(dupTime) + parseInt(result);
				console.log("dupTime = " + dupTime);
				console.log("dividing" + (dupTime + parseInt(result)) + " by " + (dupNum + 1));

				//update database values
				db.update({
					"avgTime": newSum,
					"numTime": newNum
				  });
			  }
			}
		});
	}
	showUserInfo(name, id) {
		var hasTime = false;
		var timeAvg;

		for(var i in this.state.userVals) {
			var r = this.state.userVals[i];
			if(r.id === id) {
				timeAvg = r.avgTime/r.numTime;
				hasTime = true;
			}
		}

		var message;
		if(hasTime) {
			message = "Average time user spent at " + name + ": " + timeAvg + "hours";
		}
		else {
			message = name + " does not have any user submitted information";
		}

		bootbox.alert({
			message: message,
			backdrop: true
		});
	}


	render() {
		let statenow = this

		fire.auth().onAuthStateChanged( function(user) {
			if (user) {
			statenow.getAlreadyFaved();
			statenow.getUserSubmissions();
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

										<Button variant="outline-secondary" 
											onClick={ () => this.showUserInfo( 
														attraction.name,
														attraction.id
													)}>
												<FontAwesomeIcon icon={faInfo} />
										</Button>

										<Button variant="outline-primary" 
											onClick={ () => this.userTime( 
														attraction.name,
														attraction.id
													)}>
												<FontAwesomeIcon icon={faClock} />
										</Button>

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
