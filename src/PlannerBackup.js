import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import kerm from './img/kermit.jpg';
import fire from './config/fire';
import Firebase from 'firebase';
import { FirestoreCollection, FirestoreDocument } from 'react-firestore';

import FirebaseDatabaseNode from 'react-firestore';


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

          {/* <FirestoreDocument
            path="/Attractions/fwyH713e0sLlWTVXPCUb"
            render={({ isLoading, data }) => {
              return isLoading ? (
                <p>loading</p>
              ) : (
                <div>
                  <h1>{data.Name}</h1>
                  <h2>
                    {data.Address} - {data.Popularity}
                  </h2>
                  <p>{data.Description}</p>
                </div>
              );
            }}
          /> */}

          {/* <FirestoreCollection
            path="/Attractions"
            sort="Address"
            render={({ isLoading, data }) => {
              return isLoading ? (
                  <p>loading</p>
              ) : (
                <div>
                  <h1>Stories</h1>
                  <ul>
                    {data.map(Attractions => (
                      <li key={Attractions.id}>
                        {Attractions.Address} - {Attractions.Popularity}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }}
          /> */}

          {/* <FirebaseDatabaseNode path="Attractions/">
            {data => {
              const { value } = data;
              if (value === null || typeof value === "undefined") return null;
              const keys = Object.keys(value);
              const values = Object.values(value);
              const valuesWithKeys = values.map(
                (value, i) =>
                  ({
                    link_url:value.link_url,
                    link_description: value.link_description,
                    id: keys[i]
                  })
              );
              return <AutoComplete items={valuesWithKeys} />;
            }}
          </FirebaseDatabaseNode> */}

          

        </div>
      );
    }
    }
    export default Planner;