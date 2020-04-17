
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, Form, Col, Jumbotron,InputGroup,Accordion,Card,Table,Tab,Tabs,TabPane,NavLink,Nav, NavItem} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState } from 'react';
import fire from './config/fire'
import './Account.css';
import SavedPage from "./SavedPage";
import { faCog } from "@fortawesome/free-solid-svg-icons";

class Account extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: "",
        newEmail: "", 
        photourl: ""
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
      var database = fire.database();

      user.updateProfile({
        displayName: this.state.email,
        photoURL: "https://i.picsum.photos/id/1014/200/300.jpg",
        tenantId: this.state.password,
        email: this.newEmail
      }).then(function() {
        alert("Update Successful!")
      }).catch(function(error) {
        alert(error)
      });
      //let msgRef = fire.database().ref('users/').orderByKey().limitToLast
      var profileData = {
        party_size: this.state.password,
        state: "IN"
      }
      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
      }
      fire.database().ref('/users/' + uid).set({
        party_size: this.state.password,
        state: "CO",
        country: "US"
      });

      //fire.analytics().setUserProperties({party_size: '69'});
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
      var uid;
      if (user != null) {
        uid = user.uid;
        //return "X";
      }

      var data;
      /*const usersRef = fire.database().ref('/users/' + uid);
      usersRef.on("value", function(snapshot) {
        data = snapshot.val();
        console.log("sadfg");
        //console.log(snapshot.val());
        console.log(data);
        //console.log(data.party_size)
        //alert(party_size[0]);
        if (data != null) {
          //alert(data.party_size)
          return data.party_size;
        }
      }, function (error) {
        //console.log("Error: " + error.code)
      });
      */
      
      return data;
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

    getProfilePic = (e) => {
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

      return photoUrl;
    }
    /*
    <div>
        <Jumbotron style={{ textDecoration: 'none',background:'#FF5E5B', color:'white'}}>
        <h2 align="center">Account Details</h2>
        </Jumbotron> 
        </div>
<h3 align="center">Current Info</h3>
              <p>Name: {this.getName()}</p>
              <p>Email: {this.getEmail()}</p>
         

              <div align="center">
              <h3 align="center">Update Info</h3>
              <Form noValidate className="needs-validation" onSubmit={this.updateInfo}>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    onChange={this.myChangeHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom02">
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
              
              
              <Button type="submit">Submit form</Button>
                    
            </Form>
           
            </div>




    */

    render() {
      return (
        <div className="Account">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
        <section id="container">
        <div id="accountone">
        <div id="icon">  
        
        <img src={this.getProfilePic()} alt="&#xf007;" width="180" height="180" class="passphoto"></img>
        
        <h3>Welcome,</h3> 
        </div>
        <div>  
        <h2>{this.getName()}!</h2>
        </div>
       
        
        <div id="topbottom">  

        <h4>hello</h4>
        <i class="fas fa-home fa-2x" style={{ textDecoration: 'none', color:'#FF5E5B'}}></i>
        <Link to='/' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12">Home</span> </Link>
        </div>

        <div id="topbottom">  
        <h4>hello</h4>
        <i class="fas fa-plus-circle fa-2x" style={{ textDecoration: 'none', color:'#FF5E5B'}}></i> 
        <Link to='/itform' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12" >Create New</span></Link>
        </div>

        <div id="topbottom">  
        <h4>hello</h4> 
        <i class="fas fa-cog fa-2x" style={{ textDecoration: 'none', color:'#FF5E5B'}} ></i>
        <Link to='/settings' style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Settings</span> </Link>
        </div>
        <div id="topbottom">  
        <h4>hello</h4>
        <i class="fas fa-key fa-2x" style={{ textDecoration: 'none', color:'#FF5E5B'}}></i>
        <Link to='/forgot' style={{ textDecoration: 'none', color:'black'}}><span class="ml-12">Reset Password</span> </Link>
        </div>

        

        </div>
        <div align="center" id="accounttwo"> 
        <div id="move"> 

        
              
              
            <div>
        <SavedPage / >
        </div> 


          </div>
        </div>   
        </section> 
        </div>

      );
    }
    }
    export default Account;