class YelpClient {
    constructor(){
      this.apiKey = "zyPWG_QxvokChwb3lHLU8wvzWLEWq8SlvpPwr1I_yE9izq4aonvbf6XTlM7JkhqA7uPbKqorBa-0H67-9djEePPUE5JWAgBUloI5s9blpLpDD_70Qo2M1Bz61Iw3XnYx";
    }
    
    search(parameters){
      return _send({
        url: 'https://api.yelp.com/v3/businesses/search',
        query: parameters,
        bearerToken: this.apiKey
      });
    }
  
    phoneSearch(parameters){
      return _send({
        url: 'https://api.yelp.com/v3/businesses/search/phone',
        query: parameters,
        bearerToken: this.apiKey
      });
    }
}