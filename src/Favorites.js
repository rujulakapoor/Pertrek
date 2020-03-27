import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import fire from "./config/fire";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';

class Favorites extends Component {
    constructor(props) {
      super(props);
      this.getAlreadyFaved = this.getAlreadyFaved.bind(this);
      this.deleteFavorite = this.deleteFavorite.bind(this);

        this.state = {
            alreadyFaved: [],
            retreived: false
        }
    }
    
    getAlreadyFaved() {
		if(this.state.retreived === false ){
			const user = fire.auth().currentUser.uid;
			console.log("user id = " + user);

			fire.database()
				.ref('favoriteItems/' + user)
				.on("value", snapshot=> {
					if(snapshot.val()) {
						let currentstate = this;
						console.log("Snapshot = " + snapshot.val());
					
						const values = snapshot.val();
						console.log(values);
                        
                        Object.entries(values).map((fav) => {
                            currentstate.setState( {
                                alreadyFaved: [...currentstate.state.alreadyFaved,  fav]
                            })
                        })

					}
				})
		

			this.state.retreived=true;
			console.log("DID IT !!!")
        } 
		
    }
    
    deleteFavorite(favID){

        const user = fire.auth().currentUser.uid;
        fire.database().ref('favoriteItems/' + user).child(favID[0]).remove();
      
         this.setState({
            itineraalreadyFavedries: [],
            retreived: false
        })
        this.getAlreadyFaved();
        window.location.reload(false); //TODO: you shouldn't have to reload everything :(
      
    }
  
    render() {
        let statenow = this

		fire.auth().onAuthStateChanged( function(user) {
			if (user) {
			statenow.getAlreadyFaved();
        }})
        
        return (

            <div className="planner">

                <div className="row">
					<div className='col-xl-12'>
						<h1>My Favorites</h1>
                    </div>
                 </div>

                {Object.entries(this.state.alreadyFaved).map(([key,value]) =>

                    <Card key={value[0]} className="float-left" style={{width: '18rem', marginRight: '1rem', height: '30rem', margin:'15px'}}>
                        <Card.Header as="h5"> <b>{value[1].name}</b> </Card.Header>
                        <Card.Img variant="top" src={ value[1].image } className="card-img"/>
                        <Card.Body>
                            <Card.Text as="h4">
                                Cost: { value[1].price }
                            </Card.Text>
                            <Card.Text as="h4">
                                Rating: { value[1].popularity }/5
                            </Card.Text>

                            <Card.Text as="h4">
                                <StarRatings
                                    rating={ value[1].popularity }
                                    starDimension="15px"
                                    starSpacing="2px"
                                    starRatedColor="rgb(245, 214, 44)"
                                />
                            </Card.Text>

                            <Card.Text as="p">
                                { value[1].description }
                            </Card.Text>

                            <Button variant="outline-danger" onClick={this.deleteFavorite.bind(this, this.state.alreadyFaved[key])}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>

                            <Button variant="primary" onClick={this.deleteFavorite.bind(this, this.state.alreadyFaved[key])}>Delete</Button>

                        </Card.Body>
                        <Card.Footer as="h4">{ value[1].address }</Card.Footer>
                    </Card>
                    )
                }


            </div>  
        )
    }
      
  }
  export default Favorites;