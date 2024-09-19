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
import Sidebar from './Sidebar';

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
  }, [removeFromFavourites]);
  return (
    <div className="profile-container">
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
