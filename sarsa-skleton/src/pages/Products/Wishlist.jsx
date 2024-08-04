import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import img3 from '../../images/remove.jpg';
import img4 from '../../images/cart.png';
import useAxiosPublic from '../../hooks/useAxios';

const Wishlist = () => {
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
  );
};

export default Wishlist;
