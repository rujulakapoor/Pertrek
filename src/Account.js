import React, { Component } from 'react';

class Account extends Component {
    constructor(props) {
      super(props);
        
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }

    render() {
      return (
        <body >

          <div className="container">

            <h2>Account Details</h2>
            <div className="container col-md-4">
              <form>
                <p>Email</p>
                <input type="text"></input>
                <p>Password</p>
                <input type="text"></input>
                <br></br>
                <br></br>
                <button>Reset Password</button>
              </form>
            </div>
          </div>
      </body>
      );
    }
    }
    export default Account;