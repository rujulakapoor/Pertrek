
import { fas, faHamburger, faPizzaSlice, faIceCream, faBirthdayCake, faCookie, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faBacon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FiEdit2, FiSave} from 'react-icons/fi'
import {Button, Jumbotron, Table, Tabs,Tab, TabPane, Accordion,Card, Form, Container, Row, Col,
    Nav, NavItem, NavLink } from 'react-bootstrap'
import React, { Component } from "react";
export class Breakfast extends Component {
        
    constructor(props) {
        super(props);
        this.changeLocation = this.changeLocation.bind(this);
        this.changeBudget= this.changeBudget.bind(this)
        this.changeMeal= this.changeMeal.bind(this)
        this.changeWakeup= this.changeWakeup.bind(this)
        this.changeSleep= this.changeSleep.bind(this)
        this.save= this.save.bind(this)
        this.state = { 
            checked: true,
            editlocation:false,
            editbudget:false, 
            editmealcount:false,
            editwakeup:false,
            editsleep:false,
            wakeup:null,
            sleep:null,
            mealcount:null,
        
        };
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }
    handleChangeCheck() {
        //alert("hello");
        this.setState({
          checked: !this.state.checked
        })
    }
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
      
    }
    closeAll = () => {
        this.refs.run1.instance.hide();
        this.refs.run2.instance.hide();
        this.refs.run3.instance.hide();
    }
    
    toggleFirst = () => {
        this.refs.run1.instance.toggle();
    }
    locationRender() {

        if(this.state.editlocation) {
          return(
          <div className="MealsStuff" id="moreMealStuff">      
          <input type="text" placeholder={this.state.location}  onChange={this.handleChange('location')}/>
          </div>
          )
          
        }
        else {
          return(
          <div className="MealsStuff" id="moreMealStuff">
          <h5> {this.state.location}</h5>
          </div>  
            );
        }
      
    }
    locationButtonRender() {
        if(this.state.editlocation) {
        return(     
            <div className="MealsStuff" id="moreMealStuff">  
            <Button variant="light" onClick={this.changeLocation}>
             <FiSave />
             </Button>
             </div>

        )
        } else {
          return( 
            <div className="MealsStuff" id="moreMealStuff">      
                <Button id="edit" variant="light" onClick={this.changeLocation}>
               <FiEdit2 />
               </Button>
            </div>
        )
        }
      }
      budgetRender() {

        if (this.state.editbudget) {
            
          return(
          <div className="MealsStuff" id="moreMealStuff">  
          <input type="number" placeholder={this.state.budget} onChange={this.handleChange('budget')}/>
          </div>
          );
        } 
        else {
          return(
          <div className="MealsStuff" id="moreMealStuff">      
          <h5>${this.state.budget}</h5>
          </div>
          
          );
        }
      
      }
      budgetButtonRender() {
        if(this.state.editbudget) {
          return(   
               <div className="MealsStuff" id="moreMealStuff">   
               <Button variant="light" onClick={this.changeBudget}>
               <FiSave />
               </Button>
               </div>
          )
          } else {
            return(     
                <div className="MealsStuff" id="moreMealStuff">   
                 <Button variant="light" onClick={this.changeBudget}>
                 <FiEdit2 />
                 </Button>
                 </div>
          )
          }
        
      }

      mealRender() {

        if(this.state.editmealcount) {
          
          return(
          <div className="MealsStuff" id="moreMealStuff">      
          <input type="text" value={this.state.mealcount} placeholder={this.state.meal}  onChange={this.handleChange('meal')}/>
          </div>
          
          )
          
        }
        else {
          return(
          <div className="MealsStuff" id="moreMealStuff">
          <h5> {this.state.meal}</h5>
          </div>  
            );
        }
        
    }
    wakeupRender() {

      if(this.state.editwakeup) {
        
        return(
        <div className="MealsStuff" id="moreMealStuff">      
        <input type="time" value={this.state.wakeup} placeholder={this.state.wakeup}  onChange={this.handleChange('wakeup')}/>
        </div>
        )
        
      }
      else {
        return(
        <div className="MealsStuff" id="moreMealStuff">
        <h5> {this.state.wakeup}</h5>
        </div>  
          );
      }
    
  }
  sleepRender() {

    if(this.state.editsleep) {
      return(
      <div className="MealsStuff" id="moreMealStuff">      
      <input type="time" value={this.state.sleep} placeholder={this.state.sleep}  onChange={this.handleChange('sleep')}/>
      </div>
      )
      
    }
    else {
      return(
      <div className="MealsStuff" id="moreMealStuff">
      <h5> {this.state.sleep}</h5>
      </div>  
        );
    }
  
}
    mealButtonRender() {
      if(this.state.editmealcount) {
        return(   
             <div className="MealsStuff" id="moreMealStuff">   
             <Button variant="light" onClick={this.changeMeal}>
             <FiSave />
             </Button>
             </div>
        )
        } else {
          return(     
              <div className="MealsStuff" id="moreMealStuff">   
               <Button variant="light" onClick={this.changeMeal}>
               <FiEdit2 />
               </Button>
               </div>
        )
        }
      
    }
    wakeupButtonRender() {
      if(this.state.editwakeup) {
        return(   
             <div className="MealsStuff" id="moreMealStuff">   
             <Button variant="light" onClick={this.changeWakeup}>
             <FiSave />
             </Button>
             </div>
        )
        } else {
          return(     
              <div className="MealsStuff" id="moreMealStuff">   
               <Button variant="light" onClick={this.changeWakeup}>
               <FiEdit2 />
               </Button>
               </div>
        )
        }
      
    }
    sleeppButtonRender() {
      if(this.state.editsleep) {
        return(   
             <div className="MealsStuff" id="moreMealStuff">   
             <Button variant="light" onClick={this.changeSleep}>
             <FiSave />
             </Button>
             </div>
        )
        } else {
          return(     
              <div className="MealsStuff" id="moreMealStuff">   
               <Button variant="light" onClick={this.changeSleep}>
               <FiEdit2 />
               </Button>
               </div>
        )
        }
      
    }

      changeLocation() {
          alert("herrrrrrrrrrrrrrrr");
        if(this.state.editlocation === false) {
          this.setState({
            editlocation:true
          })
        } else {
          this.setState({
            editlocation:false,
            alreadysaved:false
          })
      
        }
      } 

      changeBudget() {
        if(this.state.editbudget === false) {
          this.setState({
            editbudget:true
          });
        } else {
          this.setState({
            editbudget:false,
            alreadysaved:false
          })
        }
      
      } 
      changeMeal() {
        if(this.state.editmealcount === false) {
          this.setState({
            editmealcount:true
          });
        } else {
          this.setState({
            editmealcount:false,
            alreadysaved:false
          })
        }
      
      } 
      changeWakeup() {
        if(this.state.editwakeup === false) {
          this.setState({
            editwakeup:true
          });
        } else {
          this.setState({
            editwakeup:false,
            alreadysaved:false
          })
        }
      
      } 
      changeSleep() {
        if(this.state.editsleep === false) {
          this.setState({
            editsleep:true
          });
        } else {
          this.setState({
            editsleep:false,
            alreadysaved:false
          })
        }
      
      } 
    save(){
      alert(this.state.meal)
      alert(this.state.wakeup)
      alert(this.state.sleep)
    }
    
    render() {
        const content = this.state.checked 
      ? null
      : <div className="MealsStuff" id="moreMealStuff"> 
            <Row>
           <Col>
            <h4>  Resturant:  </h4>
                {this.locationRender()}
                {this.locationButtonRender()}
            </Col>
            <Col>
            <h4>  Budget:  </h4>
            {this.budgetRender()}
            {this.budgetButtonRender()}
            </Col> 
            </Row>      
        </div>;

    return (
      <div id="meals2" className="breakfast">
      <div id="meals4">
      <Button variant="light" onClick={this.save}>
             <FiSave />
      </Button>  
      <Row>
      <Col> 
      <h4>  Daily Meal Count:  </h4>
          {this.mealRender()}
          {this.mealButtonRender()}
      </Col> 
      <Col> 
      <h4>  Daily Wake Up Time:  </h4>
          {this.wakeupRender()}
          {this.wakeupButtonRender()}
      </Col>  
      <Col>     
      <h4>  Daily Sleep Time:  </h4>
          {this.sleepRender()}
          {this.sleeppButtonRender()} 
      </Col>     
      </Row> 
      </div>  

     <Accordion defaultActiveKey="1">
     <Card className="notes2">

       <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
       <FontAwesomeIcon icon={faBacon} size = '2x' color='#c7d0d8' className="mr-3"/>  
       <h2>Breakfast</h2>
       </Accordion.Toggle>
       <Accordion.Collapse eventKey="0">
       <Card.Body>
          <div className="mbsc-btn-group-block">
                <div>
                <div>
                    <h3>I'm Not Eating</h3>
                    <input 
                    type="checkbox" 
                    checked={ this.state.checked } 
                    onChange={ this.handleChangeCheck } />
                </div>
                { content }
                </div>
                </div>
        </Card.Body>
       </Accordion.Collapse>

     </Card>
    </Accordion>


          


        
    </div>
    );
    }   

}
export default Breakfast;