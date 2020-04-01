import React, { Component } from 'react';
import {Accordion, Button, Carousel, Card} from 'react-bootstrap'
import Firebase from 'firebase';
import './PreviewAttractions.css';
export class PreviewAttractions extends Component {
constructor(props) {
  super(props);
  this.save = this.save.bind(this);

  this.state = {
    attractionList: [],
    attractions: [],
    restaurants: [],
    usedAttractions: [],
    citySelect: this.props.location
  }
}
getUserData = () => {
  let ref = Firebase.database().ref('/');
  ref.on('value', snapshot => {
    const state = snapshot.val();
    this.setState(state);
  });
  console.log('DATA RETRIEVED');
}
componentDidMount() {
  this.getUserData();

  // From Scheduler.js
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
					location: this.props.location
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
					var priceNum = 0;
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

					// Edit for filter
					if (priceVal == "$") {
						priceNum = 10;
					}
					else if (priceVal == "$$") {
						priceNum = 20;
					}
					else if (priceVal = "$$$") {
						priceNum = 50;
					}
					else if (priceVal = "$$$$") {
						priceNum = 100;
					}

					var restaurant = {
						name: obj.name,
						price: priceVal,
						priceNum: priceNum,
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
						location: this.props.location
				}
				})
				.then(function (response) {
					for(var a in response.data.businesses){
						var obj = response.data.businesses[a];
						var priceVal = '';
						var mapSrc = "https://www.google.com/maps/embed/v1/view?zoom=17&center=" + obj.coordinates.latitude + "%2C" + obj.coordinates.longitude + "&key=AIzaSyCCmcTKSewv97TqQWpL-XX6lIE_5qo7jpc";
						var priceNum = 0;

						if(obj.price == undefined) {
							//free!!
							priceVal = "free!";
						}
						else {
							priceVal = obj.price;
						}

						// Edit for filter
						if (priceVal == "$") {
							priceNum = 10;
						}
						else if (priceVal == "$$") {
							priceNum = 20;
						}
						else if (priceVal = "$$$") {
							priceNum = 50;
						}
						else if (priceVal = "$$$$") {
							priceNum = 100;
						}

						var address = obj.location.address1 + ", " + obj.location.city + ", " + obj.location.zip_code;
						var description = obj.name + " is categorized as " + obj.categories[0].title + ". Call for more information at: " + obj.phone; //TODO: list all categories

						var attraction = {
							name: obj.name,
							price: priceVal,
							priceNum: priceNum,
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
componentDidUpdate(prevProps, prevState) {
  // check on previous state
  // only write when it's different with the new state
  //if (prevState !== this.state) {
  //  this.writeUserData();
  //}
}

save(attraction) {

	//alert(attraction.name);
	//alert(attraction.address);
	
	const user = Firebase.auth().currentUser.uid;
	//Firebase.database().ref('destinations/' + user + '/' + this.props.itkey).remove();
    //const db = Firebase.database().ref('destinations/' + user + '/' + this.props.itkey);
	//Firebase.database().ref('destinations/' + user + '/' + this.props.title).remove();
	const db = Firebase.database().ref('destinations/' + user + '/' + this.props.title);
    db.push(attraction
    ).then(ref => {
        console.log('Added document with ID: ', ref.id);
        console.log(ref)
        
    });
}

render() {
  const { attractionList } = this.state; //COLLECTION NAME
  const budget = this.props.budget;
  const location = this.state.citySelect;
  
  return(
    <div>
	<div className="row">
	<h3> User Submitted Attractions </h3>
    <Carousel >
      { 
            attractionList //COLLECTION NAME
            .filter(function (attractionito) {
              return Number.parseInt(attractionito.cost, 10) < budget || attractionito.cost == "free"
                || attractionito.cost == "FREE" || attractionito.cost == "free!"
            }).map(attraction => 
              <Carousel.Item>
              <Card key={attraction.uid} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
                <Card.Header as="h5">{ attraction.name }</Card.Header>
                <Card.Img variant="top" src={ attraction.image } />
                <Card.Body>
                  <Card.Text as="h4">
                    Cost: ${ attraction.cost }
                  </Card.Text>
                  <Card.Text as="h4">
                    Estimated duration: { attraction.duration } hours
                  </Card.Text>
                  <Card.Text as="h4">
                    { attraction.popularity } reviews
                  </Card.Text>
                  <Card.Text as="p">
                    { attraction.description }
                  </Card.Text>
                  <Button variant="secondary" onClick={this.save.bind(this, attraction)}>Add</Button>
                </Card.Body>
                <Card.Footer as="h4">
                  { attraction.address }
                </Card.Footer>
              </Card>
              </Carousel.Item>
              )
          } 
    </Carousel>
	</div>
	<div className="row">
		<h3>Suggested Restaurants</h3>
    <Carousel>
    {
						this.state.restaurants //COLLECTION NAME
						.filter(function (attractionito) {
							return Number.parseInt(attractionito.priceNum, 10) < budget
						}).map(attraction =>
							<Carousel.Item>
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
											Popularity: { attraction.popularity }/5
										</Card.Text>
										<Card.Text as="p">
											{ attraction.description }
										</Card.Text>
										<Button variant="secondary" onClick={this.save.bind(this, attraction)}>Add</Button>

									</Card.Body>

									<Card.Header>
										<Accordion.Toggle as="h4" variant="link" eventKey="1">
											{ attraction.address }
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											<iframe width="100%" frameBorder="0" src={attraction.map}></iframe>
										</Card.Body>
									</Accordion.Collapse>

								</Card>
							</Carousel.Item>
							)
						}
    </Carousel>
	</div>
	<div className="row">
	<h3>Suggested Attractions</h3>
    <Carousel>
    {
						this.state.attractions //COLLECTION NAME
						.filter(function (attractionito) {
							return Number.parseInt(attractionito.priceNum, 10) < budget || attractionito.price == "free"
							|| attractionito.price == "FREE" || attractionito.price == "free!"
						}).map(attraction =>
							<Carousel.Item>
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
											Popularity: { attraction.popularity }/5
										</Card.Text>
										<Card.Text as="p">
											{ attraction.description }
										</Card.Text>
										<Button variant="secondary" onClick={this.save.bind(this, attraction)}>Add</Button>
									</Card.Body>

									<Card.Header>
										<Accordion.Toggle as="h4" variant="link" eventKey="1">
											{ attraction.address }
										</Accordion.Toggle>
									</Card.Header>
									<Accordion.Collapse eventKey="1">
										<Card.Body>
											<iframe width="100%" frameBorder="0" src={attraction.map}></iframe>
										</Card.Body>
									</Accordion.Collapse>

								</Card>
							</Carousel.Item>
							)
						}
    </Carousel>
	</div>
    </div>
  )
}

}
export default PreviewAttractions
