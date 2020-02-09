import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Home from './Home';
import Login from './Login';
import Main from './Main';
import Navigation from './Navigation'

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = ({
      user: {},
    });
  }

  logout() {
    fire.auth().signOut();
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
       {this.state.user ? (
         <React.Fragment>
          <Navigation value={this.logout}/>
          <Main/>
         </React.Fragment>
        ) : (
          <Login/>
        )}
     </div>
    );
}
}

 export default App;