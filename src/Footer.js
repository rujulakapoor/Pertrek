import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


class Footer extends React.Component {
    constructor(props) {
    super(props);
    }
 
    render() {
        return (
            <div className="footer">
                <MDBFooter color="#FF5E5B" className="font-small pt-2 mt-1" style={{backgroundColor:"#FF5E5B",color:"white"}}>
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                          Pertrek
                        </MDBContainer>
                    </div>
                </MDBFooter>

            </div>
        );
    }
  }


export default Footer
