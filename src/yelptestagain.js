//search endpoint url
//GET https://api.yelp.com/v3/businesses/search

//QUERY STRING
//?term=restaurants%location=92967

import React, { Component } from 'react';
import { $CombinedState } from 'redux';

class yelptestagain extends Component {
	constructor(props) {
		super(props);

			
	}
	componentDidMount() {
		console.log("starting");
		var token = 'Bearer zyPWG_QxvokChwb3lHLU8wvzWLEWq8SlvpPwr1I_yE9izq4aonvbf6XTlM7JkhqA7uPbKqorBa-0H67-9djEePPUE5JWAgBUloI5s9blpLpDD_70Qo2M1Bz61Iw3XnYx';
		var yelp_search_url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';

		var requestObj = {
			url: yelp_search_url,
			data: {term:'restaurants', location: '92697'},
			headers: {'Authorization': token},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('AJAX error, jqKHR = ', jqXHR, ', textStatus = ', textStatus, ', errorThrown = ', errorThrown)
			}
		}

		console.log(requestObj);

		const axios = require('axios');

		axios.get(requestObj.url, {
			headers: {
					Authorization: token
			},
			params: {
					term:'restaurants',
					location: '92697'
			}
			})
			.then(function (response) {
				console.log("typeof response = " + typeof response);
				console.log("response = " + response.data);
				for(var a in response.data.businesses){
					console.log("life sucks " + a);
				}
				console.log("businesses = " + response.data.businesses)
				console.log("i'm in hell = " + response.data.businesses[0].name)
			})
			.catch(function (error) {
				console.log(error);
			})
			.then(function() {
				console.log("done");
			});

		// $.ajax(requestObj)
		// 	.done(function(response)) {
		// 		console.log('typeof response = ' + typeof response);
		// 		console.log('response = ', response);
		// 	}

	}
	

	render() {
		return (
			<div className="yelp">
			
			</div>
		);
	}
}
export default yelptestagain;