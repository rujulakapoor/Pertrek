import React, { Component } from 'react';
import {Accordion, Button, Carousel, Card} from 'react-bootstrap'
import Firebase from 'firebase';
import bootbox from "bootbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
  } from "@fortawesome/free-solid-svg-icons";

export class customAttractions extends Component {
constructor(props) {
  super(props);

  this.state = {
    attractionList: [],
  }
}
getUserData = () => {
  let ref = Firebase.database().ref('/');
  ref.on('value', snapshot => {
    const state = snapshot.val();
    this.setState(state);
  });
  console.log('DATA RETRIEVED');
}
componentDidMount() {
  this.getUserData();

}
addAttraction(attraction) {
    let curr = this;
    console.log(this.props.handleAdd)
    console.log("IS ADD")
    this.props.handleAdd(attraction);
    
/*
    bootbox.prompt({
      title: "How long are you planning on spending at " + name + "?",
      inputType: "number",
      callback: function (duration) {
        bootbox.prompt({
          title: "What day will you attend " + name + "?",
          inputType: "date",
          callback: function (date) {
            var added = {
              name: name,
              time: duration,
              date: date,
            };

            curr.props.addedAttraction(added);
          },
        });
      },
    });
    */
  }



render() {
  const { attractionList } = this.state; //COLLECTION NAME

  
  return(
    <div>
    <div className='planner'>
        { 
            attractionList //COLLECTION NAME
            .map(attraction => 
              <Card key={attraction.uid} className="float-left" style={{width: '18rem', marginRight: '1rem'}}>
                <Card.Header as="h5">{ attraction.name }</Card.Header>
                <Card.Img variant="top" src={ attraction.image } />
                <Card.Body>
                  <Card.Text as="h4">
                    Cost: ${ attraction.cost }
                  </Card.Text>
                  <Card.Text as="h4">
                    Estimated duration: { attraction.duration } hours
                  </Card.Text>
                  <Card.Text as="h4">
                    { attraction.popularity } reviews
                  </Card.Text>
                  <Card.Text as="p">
                    { attraction.description }
                  </Card.Text>
                  <Button
                          variant="outline-secondary"
                          onClick={() =>
                            this.addAttraction(attraction )
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                </Card.Body>
                <Card.Footer as="h3">
                  { attraction.address }
                </Card.Footer>
              </Card>
              )
          } 
	</div>
	
    </div>
  )
}

}
export default customAttractions
