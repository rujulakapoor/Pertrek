import React, {Component} from 'react'
import {FiSave, FiEdit2} from 'react-icons/fi'
import {Button} from 'react-bootstrap'
import './GenerateItinerary.css'

export class MiniTravelCosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            costs: 0,
            edit: false
        }
        this.renderTravelCosts =this.renderTravelCosts.bind(this)
        this.travelButtonRender = this.travelButtonRender.bind(this)
        this.changeEdit = this.changeEdit.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }

    
handleChange = input => e => {
    this.setState({[input]: e.target.value})
  this.props.handlemini(e.target.value)
  }


    renderTravelCosts() {

        if(this.state.edit) {
            return(   <input type="text" placeholder={this.state.costs} onChange={this.handleChange('costs')}/>)
            
              }
              else {
                return( <>{this.state.costs}</>);
              }
    
    }

    changeEdit () {
        if(this.state.edit === false) {
            this.setState({
              edit:true
            })
          } else if(this.state.edit === true) {
             this.setState({
              edit:false,
            })
           
        
          }
    }

    
travelButtonRender() {
    if(this.state.edit) {
    return( <Button variant="light" onClick={this.changeEdit}>
         <FiSave />
         </Button>
    )
    } else {
      return(      <Button variant="light" onClick={this.changeEdit}>
           <FiEdit2 />
           </Button>
    )
    }
  
  }

    render() {

        return(
            <div>
                <button className="btn-plain" onClick={this.changeEdit}>
            <b>Expected Daily Travel Costs:</b> </button>
            {this.renderTravelCosts()}
            
            </div>
        )
    }
}

export default MiniTravelCosts