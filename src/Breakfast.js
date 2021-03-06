
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
            wakeup:'',
            sleep:'',
            mealcount:'',
            daynum: this.props.daynum
        
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
        console.log("input" + input + " target " + e.target.value)
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
          <h4> {this.state.location}</h4>
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
          <h4>${this.state.budget}</h4>
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
            
          <div className="MealsStuff2" id="moreMealStuff">      
          <input type="text" value={this.state.mealcount} placeholder={this.state.meal}  onChange={this.handleChange('meal')}/>
          </div>
          
          )
          
        }
        else {
          return(
          <div className="MealsStuff2" id="moreMealStuff">
          <h5> {this.state.meal}</h5>
          </div>  
            );
        }
        
    }
    wakeupRender() {

      if(this.state.editwakeup) {
        
        return(
        <div className="MealsStuff2" id="moreMealStuff">      
        <input type="time" placeholder={this.props.wakeup}  onChange={this.handleChange('wakeup')}/>
        </div>
        )
        
      }
      else {
        return(
        <div className="MealsStuff2" id="moreMealStuff">
        <h5> {this.state.wakeup}</h5>
        </div>  
          );
      }
    
  }
  sleepRender() {

    if(this.state.editsleep) {
      return(
      <div className="MealsStuff2" id="moreMealStuff">      
      <input type="time"  placeholder={this.props.sleep}  onChange={this.handleChange('sleep')}/>
      </div>
      )
      
    }
    else {
      return(
      <div className="MealsStuff2" id="moreMealStuff">
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
          //
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
          this.state.sleep = this.props.sleep;

          this.props.handleWakeup(this.state)

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
          this.state.wakeup = this.props.wakeup;
          this.props.handleSleep(this.state)

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
     
      <div id="movedown">
    <Row>
     
    <div id="lll" className="llll">
        <h1>Breakfast</h1>
    </div>  

    <Card  style={{ width: '34rem', height: '14rem'  }}  >
    <Card.Img src="https://lh3.googleusercontent.com/SUpYumojviGcsXU8-o05k2tm-b0MMD3sG6iQzag0Hl8nQg8lOk0W-063HHYzkg9w1nZe6Sn3-2meMJ-zNhl4OqVGNypgZYYgAiEBooPqCA4CmyoPqDWN730ekMpmA-i8WVLWSxrjRQ=w2400" height="250" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Body>
          <div class="bottom-left2">
                <div class="settingForm2">
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
      </Card.ImgOverlay>
  </Card>   
  
  </Row>
  </div> 
   <div id="meals4">
       <div id="savemealc">
      <Button variant="light" onClick={this.save}>
             <FiSave />
      </Button>  
      </div> 
      <Row>
      <Col> 
      <div id="outlinemeal" className="MealsStuffh3"> 
      <h7>  Daily Meal Count:  </h7>
          {this.mealRender()}
          {this.mealButtonRender()}
     </div>    
      </Col> 
      <Col> 
      <div id="outlinemeal" className="MealsStuffh3"> 
      <h7>  Daily Wake Up Time:  </h7>
          {this.wakeupRender()}
          {this.wakeupButtonRender()}
      </div>     
      </Col>  
      <Col>   
      <div id="outlinemeal" className="MealsStuffh3">   
      <h7>  Daily Sleep Time:  </h7>
          {this.sleepRender()}
          {this.sleeppButtonRender()} 
      </div>      
      </Col>     
      </Row> 
      </div>         
        
    </div>
    );
    }   

}
export default Breakfast;