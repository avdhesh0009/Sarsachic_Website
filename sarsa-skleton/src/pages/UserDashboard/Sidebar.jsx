// Sidebar.js
import React, { useEffect, useState } from 'react';
import './Sidebar.css'; // Assuming you are using a CSS file for styling
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
import useAxiosPublic from '../../hooks/useAxios';

const Sidebar = () => {
  const [user, setUser] = useState({ name: '', image:'' });

  useEffect(() => {
    // Fetch user data from the backend
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Replace with your backend API call
    const response = await fetch('/api/user');
    const data = await response.json();
    setUser({ name: data.name, image: data.image });
  };
  const handleLogout = async () =>{
    try{
      const response = await axios.post('/users/logout');
      console.log(response.data);
      setMessage(response.data.message);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="sidebar">
        
      <div className="profile-section">
        <img src={user.image} alt="Profile" className="profile-image" />
        <h3 className="profile-name">{user.name}</h3>
      </div>
      <div className="menu">
      <Link to="/userProfile"> <div className="menu-item"><span>  <img src={userImg} alt="User" style={{ width: '20px', height: '20px' }}/></span>  My Profile</div></Link>
      <Link to="/adddeliveryaddress"> <div className="menu-item"><span>  <img src={addressImg} alt="User" style={{ width: '20px', height: '20px' }}/></span>  Delivery Address</div></Link>
      <Link to="/myorders"> <div className="menu-item"><span>  <img src={bagImg} alt="User" style={{ width: '20px', height: '20px' }}/></span>  My Orders</div></Link>
        <Link to="/mywishlist">  <div className="menu-item"><span>  <img src={wishlistImg} alt="User" style={{ width: '20px', height: '20px' }}/></span> My Wishlist</div></Link>
        <Link to="/updatepassword"> <div className="menu-item"><span>  <img src={changepassImg} alt="User" style={{ width: '20px', height: '20px' }}/></span>  Change Password</div></Link>
        <Link to="">   <div className="menu-item" onClick={handleLogout}><span>  <img src={logoutImg} alt="User" style={{ width: '20px', height: '20px' }}/></span> Logout</div></Link>
      </div>
    </div>
  );
};

export default Sidebar;
