import React, { useContext, useState } from 'react';
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
import './profile.css';
import useAxiosPublic from '../../hooks/useAxios';
import Sidebar from './Sidebar';
import { WebContext } from '../../providers/WebProvider';

const Profile = () => {
  const axios = useAxiosPublic();
  const [message,setMessage] = useState('');
  const {user} = useContext(WebContext);
  
  return (
    <div className="profile-container">
      {message && (
        <div>
          {message}
        </div>
      )}
      <div className="profile-box">
       <Sidebar/>
      </div>
      <div className="profile-content">
        <h1 className="pheading">{user?.user?.username}!</h1>
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
                <label htmlFor="email">Email Id</label>
                <input type="text" name="email" id="email" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="number">Mobile Number</label>
                <input type="mnumber" name="mnumber" id="mnumber" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input type="date" name="birthdate" id="birthdate" />
            </div>
            <div className="form-group-rad">
              <label htmlFor="gender">Gender</label>
              <div>
                <input type="radio" name="gender" id="male" />
                <span> Male</span>
                <input type="radio" name="gender" id="female" />
                <span> Female</span>
                <input type="radio" name="gender" id="other" />
                <span> Other</span>
              </div>
            </div>
            <button className="save">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
