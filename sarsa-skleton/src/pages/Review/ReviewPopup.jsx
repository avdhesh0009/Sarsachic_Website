import React, { useContext, useState } from 'react';
import './revpop.css'; // Import CSS for styling (optional)
import useAxiosPublic from '../../hooks/useAxios';
import { WebContext } from '../../providers/WebProvider';

const ReviewPopup = ({id}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const axios = useAxiosPublic();
  const {user} = useContext(WebContext);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user?.user?.username)
    // console.log(id);
    // Add your submission logic here (e.g., send to an API)
    const reviewData = {
       name:user?.user?.username,
       role:"Software Developer",
       rating,
       quote:review
    }
    try {
      const response = await axios.post(`/products/add-reviews/${user?.user?._id}`,{
        productId:id,
        reviewData
      })
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
    togglePopup(); // Close popup after submission
  };

  return (
    <div>
      <button onClick={togglePopup} className="review-button">Leave a Review</button>
      
      
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button onClick={togglePopup} className="close-button">&times;</button>
            <form onSubmit={handleSubmit}>
              <h2>Submit your review</h2>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
              />
              
              <div className="rating">
                <span>Select rating:</span>
                {[...Array(5)].map((star, index) => {
                  const rate = index + 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={rate <= rating ? 'on' : 'off'}
                      onClick={() => handleRating(rate)}
                    >
                      &#9733; {/* Star symbol */}
                    </button>
                  );
                })}
              </div>
              
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPopup;
