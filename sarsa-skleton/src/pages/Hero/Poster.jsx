import React from 'react';
import './Poster.css';
import mainImage from '../../images/poster.jpg'; // Update the path to your image
import ProductBar from '../../components/ProductBar/ProductBar';

const Poster = () => {
  return (
    <div className=''>
      <ProductBar/>
      <div className="main-content">
      <img src={mainImage} alt="Demon Slayer" className="main-image" />
      </div>
     

    </div>

  );
};

export default Poster;
