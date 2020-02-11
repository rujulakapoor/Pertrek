import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import kerm from './img/kermit.jpg';


class Planner extends Component {
    constructor(props) {
      super(props);
        
    }
    onNavigateHome(){
      this.props.history.push('/Login');
    }

    render() {
      return (
        <div className="planner">

          <p>Planner</p>
          <Card style={{ width: '18rem' }}>
            <Card.Header as="h5">Attraction Name</Card.Header>
            <Card.Img variant="top" src={kerm} />

            <Card.Body>
              <Card.Text as="h4">
                Cost: $20
              </Card.Text>
              <Card.Text as="h4">
                Duration: 2 hours
              </Card.Text>
              <Card.Text as="h4">
                Popularity: 1173 reviews
              </Card.Text>
              <Card.Text as="p">
                Description: Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant="secondary">Add</Button>
            </Card.Body>

            <Card.Footer as="h3">
              5700 S Lake Shore Dr.
              Chicago, IL 60637
            </Card.Footer>

          </Card>

        </div>
      );
    }
    }
    export default Planner;