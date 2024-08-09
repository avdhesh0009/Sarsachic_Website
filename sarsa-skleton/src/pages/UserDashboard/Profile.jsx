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
import { WebContext } from '../../providers/WebProvider';
import { useRef } from 'react';
import ProfileImageUpload from '../../components/ProfileImageUpload';

const Profile = () => {
  const axios = useAxiosPublic();
  const [message,setMessage] = useState('');

  const { setUser, user } = useContext(WebContext);

  const handleLogout = async () =>{
    try{
      const response = await axios.post('/users/logout');
      console.log(response.data);
      console.log(user);
      setMessage(response.data.message);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="profile-container">
      {message && (
        <div>
          {message}
        </div>
      )}
      <div className="profile-box">
        <div className="name">
          <ProfileImageUpload />
          <h2>{user?.user?.username}</h2>
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
        <button onClick={handleLogout}>
          <button className="logout">
            <img src={logoutImg} alt="" />
            <span>Logout</span>
          </button>
        </button>
      </div>
      <div className="profile-content">
        <h1 className="heading">Welcome {user?.user?.username}!</h1>
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
                <input type="number" name="number" id="number" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input type="date" name="birthdate" id="birthdate" />
            </div>
            <div className="form-group">
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
