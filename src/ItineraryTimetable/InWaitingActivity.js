import React, { useCallback, useState , Component} from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import DraggableBox from './DraggableBox'
import doSnapToGrid from './snapToGrid'
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {Card, Button} from 'react-bootstrap'
import Draggable from 'react-draggable'


export class InWaitingActivity extends Component {

    constructor(props) {
        super(props);

    }

    render() {
       
        const activities = this.props.activities;
        console.log(activities)
        console.log("is activities render")
        console.log(this.props.activities)
        return(

            <div>
                {Object.entries(this.props.activities).map((activity) => {
                    console.log(activity[1].name);
                    console.log("is the attraction")
                    var attraction = activity[1]
                    return(
<Draggable grid={[50,50]}>
                        <Card key={attraction.uid} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
                        <Card.Header as="h5">{ attraction.name }</Card.Header>
                        <Card.Body>
                          <Card.Text as="h5">
                            Cost: ${ attraction.cost }
                            <br/>
                            Estimated duration: { attraction.duration } hours
                          </Card.Text>


                         </Card.Body>

                      </Card>

</Draggable>
                    )
                }
                )
            }
                


            </div>

        )
    }

}

export default InWaitingActivity;