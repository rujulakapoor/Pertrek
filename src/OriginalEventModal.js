import React, {Component } from 'react'
import {Form, Button} from 'react-bootstrap'
 import './GenerateItinerary.css'
export class OriginalEventModal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            day: 0,
            time: '',
            duration: '',
            cost: 0,
            blocks: '',
            timeblocks: [],
            blockids:[],
            name:'',
            address: '',
            description: '',
            notes: null

        }
        this.saveNewEvent = this.saveNewEvent.bind(this)
    }

    saveNewEvent() {
       var starttime = document.getElementById("appt").value
       var durationtime = document.getElementById("quantity").value
       var cost = document.getElementById("cost").value
        var addr = document.getElementById("addr").value
        var desc = document.getElementById("desc").value
        var name = document.getElementById("name").value
        var notes = document.getElementById("notes").value
        console.log("NOTES ARE " + notes)
        var blocksnum = durationtime / .25;
        this.state.time = starttime
        this.state.duration = durationtime
        this.state.blocks = blocksnum
        this.state.cost = parseInt(cost);
        this.state.address = addr;
        this.state.description = desc;
        this.state.name = name;
        this.state.notes = notes;


       
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
    	      <div className="activity-modal" >
              

    		    <h5>Add Actvity</h5>
<Form>

<Form.Group>
        <Form.Label> Activity Name</Form.Label>
        <input type="text" id="name" name="name" />
</Form.Group>
<Form.Group>
    <Form.Label> Select Date</Form.Label>

    <Form.Control as="select"   onChange={this.handleChange('day')}>
    {Object.entries(this.props.days).map((thing)=> {
             var str="" + thing
              
                    return(<option value={thing}>   {str.substring(2,13)}</option>);

                })
                }
    </Form.Control>

    </Form.Group>
<Form.Group>
    
    <Form.Label> Description </Form.Label>
    <input type="text" id="desc" name="desc" />

    </Form.Group>
<Form.Group>
    <Form.Label> Address </Form.Label>
    <input type="text" id="addr" name="addr" />
</Form.Group>
<Form.Group>

    <label for="appt">Select a time:</label>
        <input type="time" id="appt" name="appt" step="900" />
        </Form.Group>
<Form.Group>
    <Form.Label> Select Duration (Hours) </Form.Label>
     
    <input type="number" id="quantity" name="quantity" min=".25" max="15" step=".25"/>
    </Form.Group>
<Form.Group>
    <Form.Label> How much money do you plan to spend? </Form.Label>
    <input type="number"   id="cost" name="cost" min="0"/>

    	 </Form.Group>
                
            
         <Form.Group>
    <Form.Label> Notes (Optional)</Form.Label>
    <input type="text"   id="notes" name="notes"/>

    	 </Form.Group>
                


        <Button variant="info" onClick={this.saveNewEvent}> Add Event To Schedule</Button>
        <Button className="itinerary-fillout" onClick={this.props.handleCancel}> Cancel</Button>

    </Form>		
 
        

    	      </div>
            </div> 

            );
        }  
        
    

}

export default OriginalEventModal