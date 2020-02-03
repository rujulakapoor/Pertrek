import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Home from './Home';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      user: {},
    });
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
     <div>
       {this.state.user ? (<Home/>) : (<Login/>)}
     </div>
    );
}
}

 export default App;