import React from 'react';
import './Member.css';
import img1 from '../../images/gift.png'
import img2 from '../../images/sale.png'
import img3 from '../../images/priorshop.png'
import img4 from '../../images/Vector.png'
import { Link } from 'react-router-dom';
const Member = () => {
  const benefits = [
    { id: 1, name: 'BIRTHDAY DISCOUNTS', imageUrl: img1 },
    { id: 2, name: 'WEEKEND SALE', imageUrl: img2 },
    { id: 3, name: 'PRIORITY SHOPPING', imageUrl: img3 },
    { id: 3, name: 'SPECIAL DISCOUNT', imageUrl: img4 }
    // Add more benefits as needed
  ];

  return (
    <>
    <Link to={'/membership'}>
    <h1 className='headmem'>
        MEMBERSHIP
    </h1>
    </Link>
    <div className="membership-container">
      <h2 className="membership-heading">ENJOY THESE BENEFITS !</h2>
      <div className="membership-boxes">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="membership-box">
            <img src={benefit.imageUrl} alt={benefit.name} className="benefit-image" />
            <p className="benefit-name">{benefit.name}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Member;
