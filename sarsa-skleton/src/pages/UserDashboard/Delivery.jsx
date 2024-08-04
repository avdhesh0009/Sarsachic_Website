import React from 'react';
import { Link } from 'react-router-dom';
import searchImg from '../../images/search.jpg';
import wishlistImg from '../../images/wishlist.jpg';
import cartImg from '../../images/cart.png';
import userImg from '../../images/user.jpg';
import addressImg from '../../images/address.jpg';
import bagImg from '../../images/bag.jpg';
import editiconImg from '../../images/editicon.jpg';
import changepassImg from '../../images/changepass.jpg';
import logoutImg from '../../images/logout.jpg';


const Delivery = () => {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="name">
          <div className="profile-pic"></div>
          <h2>Tushar Chauhan</h2>
        </div>
        <Link to="/userProfile">
          <button className="user">
            <img src={userImg} alt="" />
            <span>My Profile</span>
          </button>
        </Link>
        <Link to="/adddeliveryaddress">
          <button className="address">
            <img src={addressImg} alt="" />
            <span>Delivery Address</span>
          </button>
        </Link>
        <Link to="/myorders">
          <button className="bag">
            <img src={bagImg} alt="" />
            <span>My Orders</span>
          </button>
        </Link>
        
        <Link to="/mywishlist">
          <button className="wishlist">
            <img src={wishlistImg} alt="" />
            <span>My Wishlist</span>
          </button>
        </Link>
        <Link to="/updatepassword">
          <button className="changepass">
            <img src={changepassImg} alt="" />
            <span>Change Password</span>
          </button>
        </Link>
        <Link to="">
          <button className="logout">
            <img src={logoutImg} alt="" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
      <div className="profile-content">
        <h1 className="heading">Welcome Tushar!</h1>
        <div className="profile-board">
          <button className="edit-profile"><img src={editiconImg} alt="" /></button>
          <form action="" className="profile-info">
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="add1">Address Line 1 </label>
                <input type="text" name="add1" id="email" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="add2">Address Line 2</label>
                <input type="text" name="number" id="number" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="zip">Postal/Zip</label>
                <input type="text" name="zip" id="email" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="contact">Contact</label>
                <input type="number" name="contact" id="number" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="country">Country</label>
                <input type="text" name="country" id="number" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="prov">Province</label>
                <input type="text" name="prov" id="number" />
              </div>
            </div>
            
            
            <button className="save">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
