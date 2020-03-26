import React, { Component } from 'react';
import {Button, Carousel, Card} from 'react-bootstrap'
import Firebase from 'firebase';
import './PreviewAttractions.css';
export class PreviewAttractions extends Component {
constructor(props) {
  super(props);

  this.state = {
    attractionList: []
  }
}
writeUserData = () => {
  Firebase.database().ref('/').set(this.state);
  console.log('DATA SAVED');
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
componentDidUpdate(prevProps, prevState) {
  // check on previous state
  // only write when it's different with the new state
  if (prevState !== this.state) {
    this.writeUserData();
  }
}

render() {
  const { attractionList } = this.state; //COLLECTION NAME
  const budget = this.props.budget;
  return(
    <Carousel >
      { 
            attractionList //COLLECTION NAME
            .filter(function (attractionito) {
              return Number.parseInt(attractionito.cost, 10) < budget || attractionito.cost == "free"
                || attractionito.cost == "FREE" || attractionito.cost == "Free"
            }).map(attraction => 
              <Carousel.Item>
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
                  <Button variant="secondary">Add</Button>
                </Card.Body>
                <Card.Footer as="h3">
                  { attraction.address }
                </Card.Footer>
              </Card>
              </Carousel.Item>
              )
          } 


    </Carousel>
  )
}

}
export default PreviewAttractions
