import React, { Component } from 'react';
import fire from './config/fire'



class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.onNavigateHome = this.onNavigateHome.bind(this);
        
    }
    logout() {
        fire.auth().signOut();
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }
   

    render() {
        return (
          
           <body >
           
           <div id="three" className="col-md-6">
           <div id="left"><button onClick={this.logout}>Log in</button></div>
           <div id="left"><button onClick={this.onNavigateHome}>Log IIn</button></div>
           <h3>P E R T R E K</h3>
           <h2>YOUR PERFECT VACATION STARTS HERE</h2>
           <div class="dropdown">
          <button class="dropbtn">Select A Destination</button>
          <div class="dropdown-content">
          <a href="#">Orlando</a>
          <a href="#">Chicago</a>
          <a href="#">Cincinnati</a>
        </div>
        </div>
          </div>
          </body>
        );
      }
    }
    export default Home;