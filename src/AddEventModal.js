import React, {Component } from 'react'
import {Form, Button} from 'react-bootstrap'
 
export class AddEventModal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            day: '',
            time: '',
            duration: '',
            cost: '',
            blocks: '',
            timeblocks: [],
            blockids:[]

        }
        this.saveNewEvent = this.saveNewEvent.bind(this)
    }

    saveNewEvent() {
       var starttime = document.getElementById("appt").value
       var durationtime = document.getElementById("quantity").value
       var cost = document.getElementById("cost").value
    

        var blocksnum = durationtime / .25;
        this.state.time = starttime
        this.state.duration = durationtime
        this.state.blocks = blocksnum
        this.state.cost = parseInt(cost);

       
        var midstr = starttime.substring(0,2)
        var starthour = parseInt(midstr)

        var startmin = parseInt(starttime.substring(3,5))

        for( var i = 0 ; i < this.state.blocks; i++ ){
          var str = ""
            if(starthour < 10) {
              str += 0
          }
          str+= starthour;
          str += ':'
          if(startmin < 15){
              str+= "00"
          } else {
              str += startmin
          }

          if(startmin == 45) {
              startmin = 0
              starthour++;
          } else {
              startmin += 15;
          }
          this.state.blockids.push(str)
        }
         var info = this.state;
 
        this.props.saveNewEvent(info)
       
    }


    handleChange = input => e => {
         var strarr =  e.target.value.split(',')
         var intarr = parseInt(strarr[0])
        this.setState({[input]: intarr})
      
      
      }

    handleTime(event) {
  
    }

 render() {
        return(

            <div id="popup2" class="overlay">
    	      <div class="popup" >
              

    		    <h5>Add Actvity</h5>
<Form>
    <Form.Label> Select Date</Form.Label>
    <Form.Control as="select"   onChange={this.handleChange('day')}>
    {Object.entries(this.props.days).map((thing)=> {
             var str="" + thing
              
                    return(<option value={thing}>   {str.substring(2,13)}</option>);

                })
                }
    </Form.Control>
    
    <Form.Label> Select Time </Form.Label>
    <label for="appt">Select a time:</label>
        <input type="time" id="appt" name="appt" step="900" />

    <Form.Label> Select Duration (Hours) </Form.Label>
     
    <input type="number" id="quantity" name="quantity" min=".25" max="15" step=".25"/>
    <Form.Label> How much do you plan to spend here? </Form.Label>
    <input type="number"   id="cost" name="cost" min="0"/>

    	 
            

        <Button variant="info" onClick={this.saveNewEvent}> Add Event To Schedule</Button>
    </Form>		
 
        

    	      </div>
            </div> 

            );
        }  
        
    

}

export default AddEventModal