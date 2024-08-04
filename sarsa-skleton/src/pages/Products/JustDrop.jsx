import React from 'react';
import './JustDrop.css';

import slider1 from '../../images/1slider.png';
import slider2 from '../../images/2slider.png';
import slider3 from '../../images/3slider.png';
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';

const JustDrop = () => {
  return (
    <>
      <h1 className="just-drop">JUST DROP</h1>
      <div className="product-display">
        <img
          className="product-details-icon"
          loading="lazy"
          alt=""
          src={slider1}
        />
        <img
          className="product-details-icon"
          loading="lazy"
          alt=""
          src={slider2}
        />
        <div className="product-display-inner">
          <img
            className="frame-child"
            loading="lazy"
            alt=""
            src={slider3}
          />
        </div>
      </div>
      <div className="follow-us-container">
       
        <div className="social-icons">
        <h2 className="follow-us">FOLLOW US</h2>
    
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            
            <FaInstagramSquare/>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            
            <FaFacebook/>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            
            <FaTwitter/>
          </a>
         
        </div>
      </div>
    </>
  );
}

export default JustDrop;
