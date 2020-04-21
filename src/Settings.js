import React, { Component } from 'react';
import fire from './config/fire';
import { Button, Form, Col, Jumbotron,InputGroup,Accordion,Card} from 'react-bootstrap';
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import Content from './Content';


class Settings extends Component {
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
      photoURL: "https://lh3.googleusercontent.com/fXqm_hkMqYJXe0XljGeJS9reSPUko0PCUnrbuo4sXZhe31uSA_-PAtXok9ae56vGJLjPXgm2DieT8NPTZRFE4IHPu8aT4SGymK7el43JfjyRZozVoCdyJbKYeMxwJUdPNemAJOjfkg=s307-p-k",
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
  updateInfo2 = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var database = fire.database();

    user.updateProfile({
      displayName: this.state.email,
      photoURL: "https://lh3.googleusercontent.com/kaeFpsntLy9Ec9B8G3a_sIPbOow4_UPdM4ZqVtfcceW5FcwrWqWFwLphHihsZPZuMEndFpHzsCMvWPK-MkLoPtEAytjEPrH4Vo8CZN1VRArBszV3-6S7bTcVyvnXfL9jTccL8dq6JA=w2400",
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
  updateInfo3 = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var database = fire.database();

    user.updateProfile({
      displayName: this.state.email,
      photoURL: "https://lh3.googleusercontent.com/hu0XUYz1t6WvVzGrk-aFzXgGAYaSwFqUca8NcC-TA01doTFSNpnEwnbEOkUZAhIiWvUEzUK8N6VPQklLFVCFchUVYYHrBcgPbU9XSg_Ne6AeWyqBA-XdImJmTEr2ZwEgHE5os2m4Bg=w2400",
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


  updateInfo4 = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var database = fire.database();

    user.updateProfile({
      displayName: this.state.email,
      photoURL: "https://lh3.googleusercontent.com/PdouK1VpJtQjMrZtn3_UshkHUBJPnM5GYS6IPGUCyRrXClF-85-c0uB56VTqylrJi7xhNF92u93Ti1NzIvItj2Sg9QrbF62sFbyihg6n07_pm1NIHrzB1jFuNLf571FYoT-ROr1evw=w2400",
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
  updateInfo5 = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var database = fire.database();

    user.updateProfile({
      displayName: this.state.email,
      photoURL: "https://lh3.googleusercontent.com/c3LCot4CgJafubz5WzsYCZuNkVBmGJt8af0WFiD49iZs9MtKEXHDmPS_DZfmlRMo4I2MCw-lRmG2PDqMdtoE2rhp7qaI3uWu8usozlb4KqjPJb1bLhBOj7REMm9gE7XQznFJ9rqmRQ=w2400",
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

  updateInfo6 = (e) => {
    var user = fire.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    var database = fire.database();

    user.updateProfile({
      displayName: this.state.email,
      photoURL: "https://lh3.googleusercontent.com/yJ-Dvy9v7zhuJvNJGAdVrI12L2l8BFmO2w46f-T-KQv-Y-PfE0JDAi2yDFmaUIbGNjWVH1ESQ75ErmbPP57LCZHpuvTBD0AuyN-ffASp61PgjCyef6fQH5g8fqU3jOqYRyIeQUN0Gg=w2400",
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
  

  
  
  render() {
    
    return (
        
  
     <div className="SettingPage">
     <img src="https://lh3.googleusercontent.com/XsyeOHCA1uEU3VCuTwiotBLjz52yUZDL9gtJAUpYUQzZQxxLNRpUdyXRHYGOb5ahLdzR8hNbxdLVT_5AGxeMKlg3f3ldA_C68Z-tsp1iOKnbjTSMdb1ZetQMoVD0NRjaWmI5LumG4A=w2400" width="100%" height="690"/>
      
      <div class="bottom-left">
      <div align="center">
              <div  class="settingForm">
              <h3 align="center">Update Info</h3>
             
              <Form noValidate className="needs-validation" onSubmit={this.updateInfo}>
              <Form.Label>Name</Form.Label>
              <Form.Row>
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    onChange={this.myChangeHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom02">
                  
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
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label>Family Size</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Family Size"
                    onChange={this.secondHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              
              
              
                     
            </Form>
              <Form noValidate className="needs-validation">
               <Form.Label>Select Icon </Form.Label>
               <Form.Row>
              <Button  onClick={this.updateInfo}  id="rock" type="submit"></Button>
              <Button  onClick={this.updateInfo2}  id="rock2" type="submit"></Button>
              <Button  onClick={this.updateInfo3}  id="rock3" type="submit"></Button>
              <Button  onClick={this.updateInfo4}  id="rock4" type="submit"></Button>
              <Button  onClick={this.updateInfo5}  id="rock5" type="submit"></Button>
              <Button  onClick={this.updateInfo6}  id="rock6" type="submit"></Button>
              </Form.Row>
            </Form>
           
            

            </div>
            </div>
      </div>
      
      
    </div>
  

        
      );
      
    }
    
    
}
export default Settings;