import React, { useEffect,useState } from 'react';
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
import emptyCart from '../../images/emptycarton.jpg';
import './profile.css';
import './wishlist.css'
import img1 from '../../images/leftarrow.jpg'
import img2 from '../../images/ts1.png'
import img3 from '../../images/remove.jpg'
import img4 from '../../images/cart.png'
import img5 from '../../images/ts2.png'
import img6 from '../../images/ts3.jpg'
import img7 from '../../images/ts4.jpg'
import img8 from '../../images/ts5.jpg'
import img9 from '../../images/ts6.jpg'
import img10 from '../../images/ts8.jpg'
import img11 from '../../images/ts9.jpg'
import useAxiosPublic from '../../hooks/useAxios';

const MyWishlist = () => {
  const [favourites, setFavourites] = useState([]);
  const axios = useAxiosPublic();

  const removeFromFavourites = async (productId) => {
    try {
      const response = await axios.get(`/users/remove-from-favorites/${productId}`);
      // console.log(response.data);
      setFavourites(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const response = await axios.get('/users/get-favorites');
        setFavourites(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getFavourites();
  }, []);
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="name">
          <div className="profile-pic"></div>
          <h2>Tushar Chauhan</h2>
        </div>
        <Link to="/userProfile">
          <button className="user">
            <img src={userImg} alt="User" />
            <span>My Profile</span>
          </button>
        </Link>
        <Link to="/adddeliveryaddress">
          <button className="address">
            <img src={addressImg} alt="Address" />
            <span>Delivery Address</span>
          </button>
        </Link>
        <Link to="/myorders">
          <button className="bag">
            <img src={bagImg} alt="My Orders" />
            <span>My Orders</span>
          </button>
        </Link>
        <Link to="/mywishlist">
          <button className="wishlist">
            <img src={wishlistImg} alt="My Wishlist" />
            <span>My Wishlist</span>
          </button>
        </Link>
        <Link to="/updatepassword">
          <button className="changepass">
            <img src={changepassImg} alt="Change Password" />
            <span>Change Password</span>
          </button>
        </Link>
        <Link to="">
          <button className="logout">
            <img src={logoutImg} alt="Logout" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
      
        <h1 className="heading">Welcome Tushar!</h1>
        {/* <div className="profileboard">
          <img src={wishlistImg} alt="Wishlist" />
          <p class="head">You haven't add anything in wishlist</p>
        
        <p class="subhead"><b>View our Latest products and Grab fast!</b></p>
        <button class="viewprd">
            View Products
        </button>
        </div> */}
        <div>
        {favourites && favourites.map((favourite, index) => (
          <div className="box" key={index}>
            <img 
              src={favourite.product.images && favourite.product.images.length > 0 ? favourite.product.images[0] : 'default-image.jpg'} 
              alt={favourite.product.name} 
              className="ts1" 
            />
            <button onClick={() => removeFromFavourites(favourite.product._id)}>
              <img src={img3} alt="Remove from wishlist" className="wish" />
            </button>
            <button className="addtocart">
              <div className='space-x-4 bg-red-400'>
                {favourite.product.name}
                <br />Add to cart
              </div>
              <img src={img4} alt="Add to cart" className="cart" />
            </button>
          </div>
        ))}
      </div>
      </div>

  );
};

export default MyWishlist;
