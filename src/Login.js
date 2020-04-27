import React, { Component } from 'react';
import fire from './config/fire';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import Content from './Content';
import { Carousel } from 'react-responsive-carousel';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.forget = this.forget.bind(this);
    //this.forget2 = this.forget2.bind(this);

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
   
   var count=0;
   var result2=0;
   var special=0;
   for (var i = 0; i < this.state.password2.length; i++) {
    if(this.state.password2.charAt(i)== this.state.password2.charAt(i).toUpperCase()){
        result2++;
    }
    if(this.state.password2.charAt(i)=="!" || this.state.password2.charAt(i)=="$" || this.state.password2.charAt(i)=="#" ){
        special++;
    }
   }
    //alert(special);
    var flag=1;
    var result = this.state.password2.localeCompare(this.state.password22);
    

    if(this.state.password2.length>=6 && result==0 && this.state.password22.length>=6 && result2>0 && special>0){
      flag=0;
    }



    if(flag!=1){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email2, this.state.password2).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
        alert("This Account Already Exists");
      })
    }
    else{
      alert("Your password is weak please create a password that contains \n An Uppercase Letter \n A Special Character \n Longer than 8 characters");
    } 
  }
  
  forget(e){
    e.preventDefault();
    alert("here");
    fire.auth().sendPasswordResetEmail(this.state.email3).then((u)=>{
    }).catch((error) => {
        console.log(error);
        alert("Fuck");
      });
  }
  /*
  forget2(e){
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  */

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  
  
  render() {
    
    return (
        
    <div className="Login">
    <section id="container">
    <div id="one">
    <img src="https://lh3.googleusercontent.com/0U1mUZCK1zQ3RFwzApDLwKjoX0XJ3TBpSeAhh9cFAJzyZpK0lqsvfRxnvO4i_Y95VoE8qxiV9VEfewjOi2XqBzzGKCsncou5UrZlDPzgYIumfkToj3oEzx3WQVYvr9CzZErSfCKSouQuG-4W_f8QvYVOvnSIfFmpGqfkyqnSfQ7eYtKSNPPGwKRuVur71duCVo6cd9l2-SLIJQ3oMZopvDIOq0szYdDCBl_ilBnTyoib8CIGDtl3SY5UPP_7fbHpRTOmLM0OTHWJLU6X6fQFoEnH7MvBfPFG6sFrmQw8MWIXWWvMbMmbCVknWlVnzAm5Pwxs5Yq0OsVn77daBJKNWXa45sg4_Exnyv3zZX0VE8UWJexXC6KgEuAuH31nnQ6XoPrxbD-Tm7r6qgjMzJ9gCqWj0YzrQ79Px2VJ16Yxky5mODeApF2wHJMRySPWJSGKNhg0fUWUVbHFXqwNRqDmZE1oYkOzBUz_TuW061_sHrZf_oOB34E-QBcCfMXQs7RNUFodMxboNRCwyZ39VxFmorKBXgrQKwu0YpTaAIM7pyD402vDlV9zjQyGGuJuwqn07nieeCPLRbT_HU96wzio0rILFFQEEBwPN5OCrIoNpx2LlfSWwmqN_AUnH_3LNkI7fO_8uZ6vizaKHIwSj9E4jxqMzYMRZTRRBc5hOI8LdwH6-TmglbSgwDxvU1dTcg=w541-h663-no" width="100%" height="720"/>
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
            <Link to='/forgot' style={{ textDecoration: 'none', color:'black' }}><span class="ml-12" >Forgot Passowrd</span></Link>
            <div>
            <input value={this.state.email3} onChange={this.handleChange} type="email" name="email3"  id="exampleInputEmail13" aria-describedby="emailHelp" placeholder="Email Adress" />
            </div>
            <button id="LogIn"type="submit" onClick={this.forget} class="btn btn-primary">Recover Password</button>
            </div>


            <div id="popup1" class="overlay">
    	      <div class="popup" >
    		    <h5>Create an Account</h5>
    		    <a class="close" href="#popup1">×</a>
    		    <div class="content">
            <input value={this.state.email2} onChange={this.handleChange} type="email" name="email2"  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Adress" />
            <div>
            <input value={this.state.password2} onChange={this.handleChange} type="password" name="password2"  id="exampleInputEmail1" placeholder="Password" />
            </div>
            <div>
            <input value={this.state.password22} onChange={this.handleChange} type="password" name="password22"  id="exampleInputEmail1" placeholder="Renter Password" />
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