import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import fire from './config/fire'
//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState } from 'react';
import fire from './config/fire'

class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        newEmail: ""
      }
      this.submitHandler = this.submitHandler.bind(this);
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }
    submitHandler = event => {
      event.preventDefault();
      event.target.className += " was-validated";
    };
    changeHandler = event => {
      this.setState({ [event.name]: event.value });
    };
    myChangeHandler = (event) => {
      this.setState({email: event.target.value});
    }
    secondHandler = (event) => {
      this.setState({password: event.target.value});
    }
    newEmailHandler = (event) => {
      this.setState({newEmail: event.target.value});
    }
    reauthenticate = (currentPassword) => {
      var user = fire.auth().currentUser;
      var cred = fire.auth.EmailAuthProvider.credential(
          user.email, currentPassword);
      return user.reauthenticateWithCredential(cred);
    }
    changeEmail = () => {
      this.reauthenticate(this.state.password).then(() => {
        var user = fire.auth().currentUser;
        user.updateEmail(this.state.newEmail).then(() => {
          alert("Email updated!");
        }).catch((error) => { alert(error); });
      }).catch((error) => { alert(error); });
    }
    changoEmailo = (e) => {
      alert("Email updated.");
      alert(this.state.email);
      alert(this.state.password);
      alert(this.state.newEmail);
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(userCredential) {
        userCredential.user.updateEmail(this.state.newEmail);
      }).catch((error) => {
          alert(error);
          alert("CARL WHEEZER");
        });
    }
    updateInfo = (e) => {
      var user = fire.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      user.updateProfile({
        displayName: this.state.email,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
        tenantId: this.state.password,
        email: this.newEmail
      }).then(function() {
        alert("Update Successful!")
      }).catch(function(error) {
        alert(error)
      });
      alert("Update Successful!");
      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
      }
      fire.analytics().setUserProperties({party_size: '69'});
      name = user.displayName;
      alert(name);
    }
    getName = (e) => {
      var user = fire.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
      }

      return name;
    }
    getFamilySize = (e) => {
      var user = fire.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified, familySize;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
        familySize = user.tenantId;
      }

      return familySize;
    }
    getEmail = (e) => {
      var user = fire.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
      }

      return email;
    }
    

    render() {
      return (
        <div className="Account">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
        <section id="container">
        <div id="accountone">
        <div id="icon">  
        <i class="fas fa-user-circle fa-10x"></i>
        
        <h3>Welcome</h3> 
        </div>
        <div>  
        <h2>Name From Database</h2> 
        </div>
        
        <div>  
        <i class="fas fa-home fa-2x"></i>
        <Link to='/' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12">Home</span> </Link>
        </div>

        <div>  
        <i class="fas fa-plus-circle fa-2x"></i> 
        <Link to='/planner' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12" >Create New</span></Link>
        </div>

        <div>  
        <i class="fas fa-cog fa-2x"></i>
        <Link to='/forgot' style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Settings</span> </Link>
        </div>

        <div>  
        <i class="fas fa-key fa-2x"></i>
        <Link to='/forgot' style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Reset Password</span> </Link>
        </div>
        </div>
        <div id="accounttwo"> 
        <div id="move">  
        <h1>Active Itinerary</h1> 
        <h2 align="center">Account Details</h2>
            
            <div className="container col-md-4">
              <h3 align="center">Current Info</h3>
              <p>Name: {this.getName()}</p>
              <p>Family Size: {this.getFamilySize()}</p>
              <p>Email: {this.getEmail()}</p>
            </div>

            <div className="container col-md-4">
              <h3 align="center">Update Info</h3>
              <Form noValidate className="needs-validation" onSubmit={this.updateInfo}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    onChange={this.myChangeHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Family Size</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    onChange={this.secondHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" placeholder="State" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control type="text" placeholder="Zip" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Check
                  required
                  label="Confirm!"
                  feedback="You must agree before submitting."
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
            </div>
          </div>
        </div>   
        </section> 
        </div>

      );
    }
    }
    export default Account;