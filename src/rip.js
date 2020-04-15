import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import slide1 from './img/new-zealand.jpg';

const Rip = () => {
    return (
        <div>
            <Carousel showThumbs={false}>
                <div>
                    <img src={slide1} />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
      </div>
    );
  }
  
  export default Rip;