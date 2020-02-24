import React, { Component } from 'react';

class anotherYelpTest extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        'use strict';

        const yelp = require('yelp-fusion');

        const client = yelp.client('zyPWG_QxvokChwb3lHLU8wvzWLEWq8SlvpPwr1I_yE9izq4aonvbf6XTlM7JkhqA7uPbKqorBa-0H67-9djEePPUE5JWAgBUloI5s9blpLpDD_70Qo2M1Bz61Iw3XnYx');

        client.search({
        term:'Four Barrel Coffee',
        location: 'san francisco, ca'
        }).then(response => {
        console.log(response.jsonBody.businesses[0].name);
        }).catch(e => {
        console.log(e);
        });
      }


    render() {
      return (
        <div>
            <p>kill me</p>
        </div>

      );
    }
  }


export default anotherYelpTest