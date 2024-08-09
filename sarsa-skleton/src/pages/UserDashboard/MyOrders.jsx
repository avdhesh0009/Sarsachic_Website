import React from 'react';
import emptyCart from '../../images/emptycarton.jpg';
import './orders.css';
import Sidebar from './Sidebar';

const MyOrders = () => {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <Sidebar />
      </div>
      <div className="profile-content">
        <h1 className="pheading">Welcome Tushar!</h1>
        <div className="orderboard">
          <img src={emptyCart} alt="Empty Cart" className="empty-cart-img" />
          <p>Looks like you haven't placed any orders yet!</p>
          <b>Take a Look at our products to get amazing benefits.</b>
          <button className="shopnow">Shop Now!</button>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
