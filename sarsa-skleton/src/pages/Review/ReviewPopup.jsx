import React, { useState } from 'react';
import './revpop.css'; // Import CSS for styling (optional)

const ReviewPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review:', review);
    console.log('Rating:', rating);
    // Add your submission logic here (e.g., send to an API)
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
