import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { FaPlus, FaRegHeart } from 'react-icons/fa';
import Poster from '../Hero/Poster';
import TestimonialSlider from '../Review/TestimonialSlider.jsx';
import { useParams } from "react-router-dom";
import useAxiosPublic from '../../hooks/useAxios.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('XL');
  const { productId } = useParams();
  const [productData, setProductData] = useState('');
  const [clicked, setClicked] = useState(false);
  const axios = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`/products/${productId}`);
        setProductData(response.data);
        const sizesString = response.data.sizes;
        const sizesArray = sizesString.split(',');
        setSizes(sizesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);

  const addToFavorites = async () => {
    try {
      const response = await axios.post('/users/add-favorite', { productId });
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Some Error Occurred");
    }
  }

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} custom-arrow next-arrow`} onClick={onClick} style={{ ...style }}>
        <i className="fas fa-arrow-right"></i>
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={`${className} custom-arrow prev-arrow`} onClick={onClick} style={{ ...style }}>
        <i className="fas fa-arrow-left"></i>
      </div>
    );
  };

  const addToCart = async () => {
    try {
      const response = await axios.post('/users/add-cart', {
        productId,
        quantity: 1,
        size
      });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Please Login first! ");
    }
  }

  const plusHandle = () => {
    const description = document.querySelector('.description-info-2');
    if (!clicked) {
      description.style.display = "flex";
      setClicked(true);
    } else {
      description.style.display = "none";
      setClicked(false);
    }
  }

  // Settings for the image slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    
  };

  return (
    <>
      <Poster />
      <div className="product-details">
        {/* Regular Image Gallery for large screens */}
        <div className="image-gallery">
          {productData.images && productData.images.map((image, index) => (
            <div key={index} className='gall-img'>
              <img src={image} alt={`Product ${index}`} className="product-image" />
            </div>
          ))}
        </div>

        {/* Slider for small screens */}
        <div className="image-slider">
          <Slider {...settings}>
            {productData.images && productData.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Product ${index}`} className="product-image" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="product-info">
          <div className='prod'>
            <div className='prod-name'>
              <h1 className="product-title">{productData.name}</h1>
              <p className="product-fit">OVERSIZED FIT</p>
              <p className="product-rating">★★★★☆</p>
            </div>
            <div className="product-price">
              <span className="original-price">{productData?.oginialPrice}</span>
              <span className="discounted-price">{productData?.discountedPrice}</span>
            </div>
          </div>

          <p>CHOOSE SIZE: {size}</p>
          <div className="size-selector">
            <div className="sizes">
              {sizes.map(s => (
                <button
                  key={s}
                  className={`size-button ${s === size ? 'selected' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button className="add-to-cart" onClick={addToCart}>ADD TO CART - RS {productData.price}</button>
          <div className='butto'>
            <button className='size-chart'>Size Chart</button>
            <button className="add-to-wishlist" onClick={addToFavorites}> <FaRegHeart className='heart' />ADD TO WISHLIST</button>
          </div>

          <div className="product-details-text">
            <h2>PRODUCT DETAILS</h2>
            <p>Composition: 100% cotton</p>
            <p>GSM: 220</p>
            <p>Colour: White</p>
            <p>Country of production: India</p>
            <p>Wash care: Machine wash cold with similar colours. Only non-chlorine. Tumble dry low. Warm iron if needed.</p>
            <p>Sizing: Garment measurement in inches</p>
            <p>Estimated order processing time: 48 hours</p>
          </div>

          <div className="additional-info">
            <div className="description-single">
              <h2>DESCRIPTION <FaPlus className='plus-icon' onClick={plusHandle} /></h2>
              <p className='description-info-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab provident iure error quas repellat recusandae, aliquid, quidem aspernatur distinctio culpa perspiciatis at sed aperiam, illo tempora aut dolores laudantium impedit?</p>
            </div>

            <h2>SHIPPING AND RETURN <FaPlus className='plus-icon' /></h2>
          </div>
        </div>
      </div>

      <TestimonialSlider id={productId} />
    </>
  );
};

export default ProductDetails;
