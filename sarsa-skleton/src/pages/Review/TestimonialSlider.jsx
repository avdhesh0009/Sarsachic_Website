import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TestimonialSlider.css';
import img1 from '../../images/testImg.png';
import img2 from '../../images/testImg.png';
import img3 from '../../images/testImg.png';
import ReviewPopup from './ReviewPopup';
import useAxiosPublic from '../../hooks/useAxios.jsx';
import { useState } from 'react';

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

const TestimonialSlider = ({id}) => {

  const axios = useAxiosPublic();
  const [testimonials,setTestimonials] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/products/get-reviews/${id}`);
        console.log(response.data.data.reviews);
        setTestimonials(response.data.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, []);  // If 'id' is a prop or state, it should be included in the dependency array.
  

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };

  return (
    <div className="testimonial-slider">
      <h1>This Is What Our Customers Say</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, non.</p>
      {/* <button onClick={getAllReviews}>Click Me</button> */}
      <Slider {...settings} className='slider'>
      
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <div className='con'>
            <img src={'/'} alt={testimonial.name} className="testimonial-image" />
            <div className="testimonial-content">
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-rating">
                {Array(testimonial.rating).fill().map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <hr />
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
            </div>
            
          </div>
        ))}
        
      </Slider>
      <ReviewPopup id={id}/>
    </div>
  );
};

export default TestimonialSlider;
