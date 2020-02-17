import React, { Component } from 'react';

class Account extends Component {
    constructor(props) {
      super(props);
        
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }

    render() {
      return (
        <div className="Account">
        <section id="container">
        <div id="accountone">
        </div>
        <div id="accounttwo"> 
        <h2>Active Itinerary</h2>    
        </div>
        </section> 
        </div>
      );
    }
    }
    export default Account;