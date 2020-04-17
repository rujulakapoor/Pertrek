import React, { Component } from 'react';
import fire from './config/fire';

import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import Content from './Content';


class Forgot extends Component {
  constructor(props) {
    super(props);
    this.forget = this.forget.bind(this);
    
    this.handleChange = this.handleChange.bind(this);
    this.state = {
        email: '',
      };
    
  }
  forget(e){
    e.preventDefault();
    fire.auth().sendPasswordResetEmail(this.state.email).then((u)=>{
    }).catch((error) => {
        console.log(error);
        alert("Fuck");
      });
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  
  
  render() {
    
    return (
      <div className="SettingPage">
      <img src="https://lh3.googleusercontent.com/fOyesoBUrDsOve4nxVQ8cyL9u8re61D6tsfI10nPFJOyuXx610wk8eBiUcxQdoQqvyhVc8R145-_m6VmalEoPb5xbPWuU8wN1fg9ZKwQ2p-3pEaAUZNOAiWGRvKpxdwsM3VuRGoIGQ=w2400" width="100%" height="690"/>
      <div class="bottom-middle">
      <div align="center">
          <div className="Forgot">
        <h1>Reset Your Password</h1> 
        <h2>Please enter the email registered with your account</h2> 
        <div id="five">
        <input value={this.state.email} onChange={this.handleChange} type="email" name="email"  id="exampleInputEmail13" aria-describedby="emailHelp" placeholder="Email Adress" />
        </div>
        <div id="five">
        <button id="Submit3"type="submit" onClick={this.forget} class="btn btn-primary">Submit</button>
        </div>
        </div>
        </div>
      </div>
      </div>


   
        
      );
      
    }
    
    
}
export default Forgot;