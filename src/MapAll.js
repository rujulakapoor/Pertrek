import React, { Component } from "react";
import {Accordion, Button, Carousel, Card} from 'react-bootstrap'
import { GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import Geocode from "react-geocode";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import LocationIQ from 'react-native-locationiq';
// API KEY: AIzaSyBvjIBIZImCFAb-6Rtz2C7EQlnS1Ga1Z0o
const google = window.google;
const WrappedMap = withScriptjs(withGoogleMap(Map));
Geocode.setApiKey("AIzaSyBvjIBIZImCFAb-6Rtz2C7EQlnS1Ga1Z0o");
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
LocationIQ.init("c4e640b5ed0925");
export class MapAll extends Component {
    constructor(props) {
		super(props);
		
        this.state = {
			dummy: 0,
			dest: this.props.destinations,
			destCoord: [],
			viewport: {
				latitutde: 45.4211,
				longitude: -75.6903,
				width: "70vw",
				height: "70vh",
				zoom: 10
			},
			selectedPark: null,
			setCenter: false
		}
		this.formatAddresses = this.formatAddresses.bind(this);
	}
	componentDidMount() {
		this.formatAddresses();
		  
	}
	componentWillMount() {
		
	}
	componentWillReceiveProps() {
		//alert("componentwillmount")
		//console.log("DESTINATIONSDESTINATIONSDESTINATIONSDESTINATIONSDESTINATIONSDESTINATIONS")
		if (this.props.destinations[0] != undefined && this.state.setCenter == false) {
			//alert(this.props.destinations[0].lat)
			this.state.viewport.longitude = this.props.destinations[0].lon;
			this.state.viewport.latitude = this.props.destinations[0].lat;
			this.state.setCenter = true;
		}
		
	//	console.log(this.props.destinations)
	}
	formatAddresses() {
		//var geocoder = new google.maps.Geocoder();
		var dest = this.props.destinations;
		if (dest[0] != undefined) {
			alert("formattttt")
		//	console.log("dasfgfhdsffbadfgfdhgndfgdfsgfgsgaf")
	//		console.log(dest);
			alert("address" + dest[0][1].address);
			dest.map((curr) => {
				console.log(curr[1].address);
				LocationIQ.search(curr[1].address)
					.then(json => {
						var lat = json[0].lat;
						var lon = json[0].lon;
						var name = curr[1].name;
				
						var item = {
							name: name,
							lat: lat,
							lon: lon
						}
						this.setState( {
							destCoord: [...this.state.destCoord, item]
						})
						
					})
				.catch(error => console.warn(error));
				/*
				Geocode.fromAddress(curr[1].address).then(
					response => {
						var item = {
							name: curr[1].name,
							coord: response[0].formatted_address
						}
						this.setState( {
							destCoord: [...this.state.destCoord, item]
						})
					},
					error => {
						alert('Geocode was not successful for the following reason: ' + error);
					}
				);
				*/
				
			})
		}
	}
	Map() {
		/*
		<WrappedMap 
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBvjIBIZImCFAb-6Rtz2C7EQlnS1Ga1Z0o`}
					loadingElement={<div style={{ height: "100%"}} />}
					containerElement={<div style={{ height: "100%"}} />}
					mapElement={<div style={{ height: "100%"}} />}
				/>
				*/
		return (
			<GoogleMap
				defaultZoom={10}
				defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
			/>
		);
	}

    render() {
       // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
		//console.log(this.props.destinations);
		/*if (this.props.destinations[0] != undefined) {
			this.state.viewport.longitude = this.props.destinations[0].lon;
			this.state.viewport.latitude = this.props.destinations[0].lat;
		}*/
		
		//console.log("this.state.dest")
		//console.log(this.state.dest)
		
	//	console.log("LAT LONG ARRAY")
		//console.log(this.state.destCoord)
        return(
            <div style={{ width: "100vw", height: "100vh" }}>
                <h3>Map</h3>
				<ReactMapGL 
					{...this.state.viewport} 
					mapboxApiAccessToken="pk.eyJ1IjoianVuZzIwNSIsImEiOiJjazhoMWw0dTMwNGY4M2xxdHg1Mm1xZWs3In0.Rm97yg2R3Mi2osL2WaO5jA"
					mapStyle="mapbox://styles/jung205/ck8h226la0ske1irz7vxdot81"
					onViewportChange={(viewport) => this.setState({viewport})}
				>
					{
						this.props.destinations.map(loc => (
							<Marker 
								key={5}
								latitude={loc.lat}
								longitude={loc.lon}
							>
								<svg
									height={20}
									viewBox="0 0 24 24"
									style={{
										cursor: 'pointer',
										fill: '#d00',
										stroke: 'none',
										transform: `translate(${-20 / 2}px,${-20}px)`
									}}
									onClick={(e) =>{
										e.preventDefault();
										this.state.selectedPark = loc;
									}}
								>
									<path d={ICON} />	
								</svg>
							</Marker>
						))
					}

					{this.state.selectedPark ? (
						<Popup 
							latitude={this.state.selectedPark.lat} 
							longitude={this.state.selectedPark.lon}
							onClose={() =>
								{
									this.state.selectedPark = null;
								}
							}
						>
							<div>
								<h2>{this.state.selectedPark.name}</h2>
								<p>{this.state.selectedPark.address}</p>
							</div>
						</Popup>
					) : null}
				</ReactMapGL>
				
            </div>
        );
    }
}
export default MapAll;