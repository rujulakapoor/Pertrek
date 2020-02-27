import React, { Component, useState } from 'react';
import { Button, Form, Col, InputGroup } from 'react-bootstrap';
import fire from './config/fire'
import Login from './Login'

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

    render() {
      return (
        <body >

          <div className="container">

            <h2>Account Details</h2>
            <div className="container col-md-4">
              <Form noValidate className="needs-validation" onSubmit={this.changeEmail}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Current Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    onChange={this.myChangeHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    onChange={this.secondHandler}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                  <Form.Label>doesntdosht</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please choose a username.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>New Email</Form.Label>
                  <Form.Control 
                  type="text" placeholder="New Email" required 
                  onChange={this.newEmailHandler}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
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
      </body>
      );
    }
    }
    export default Account;