import React, { Component } from 'react';
import fire from './config/fire';

import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import Content from './Content';


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.forget = this.forget.bind(this);
    this.forget2 = this.forget2.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
        email: '',
        password: ''
      };
    
  }
   
  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
        alert("Sorry Wrong Password");
      });
  }

  signup(e){
    

    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
        alert("Account not created");
      })
  }
  forget(e){
    e.preventDefault();
    fire.auth().sendPasswordResetEmail(this.state.email).then((u)=>{
    }).catch((error) => {
        console.log(error);
        alert("Fuck");
      });
  }
  forget2(e){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  
  
  render() {
    
    return (
        
    <div className="Login">
    <section id="container">
    <div id="one">
    </div>
    <div id="two">
    <h6>Log In</h6>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Adress" />
            <div>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password"  id="exampleInputEmail1" placeholder="Password" />
            </div>
            <div>
            <button id="LogIn"type="submit" onClick={this.login} class="btn btn-primary">Login</button>
            </div>
            <div class="box">
            <a  class="button" href="#">Dont't Have An Account Sign Up</a>
            </div> 
            <div>
            <button id="ForgotIn"type="submit" onClick={this.forget} class="btn btn-primary">Forgot Password</button>  
            </div>


            <div id="popup1" class="overlay">
    	      <div class="popup" >
    		    <h5>Create an Account</h5>
    		    <a class="close" href="#popup1">×</a>
    		    <div class="content">
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Adress" />
            <div>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password"  id="exampleInputEmail1" placeholder="Password" />
            </div>
            <div>
            <button id="Submit"type="submit" onClick={this.signup} class="btn btn-primary">SignUp</button>
            </div>
    		    </div>
    	      </div>
            </div>    
    </div>
    </section>
    </div>

        
      );
      
    }
    
    
}
export default Login;