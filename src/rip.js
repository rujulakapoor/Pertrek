import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
import AwesomeSlider from 'react-awesome-slider';
import slide1 from './img/new-zealand.jpg';
import slide2 from './img/rough-sea-waves.jpg';
import slide3 from './img/cape-town.jpg';
import 'react-awesome-slider/dist/styles.css';


const Rip = () => {

    return (
        <div>
            <AwesomeSlider
                bullets={false}
            >
                <div data-src={slide1} />
                <div data-src={slide2} />
                <div data-src={slide3} />
            </AwesomeSlider>
      </div>
    );
  }
  
  export default Rip;