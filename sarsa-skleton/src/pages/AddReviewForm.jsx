import React, { useState } from 'react';

const AddReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState({
    imageUrl: '',
    name: '',
    role: '',
    rating: '',
    quote: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(review);
    }
    setReview({
      imageUrl: '',
      name: '',
      role: '',
      rating: '',
      quote: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={review.imageUrl}
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={review.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={review.role}
          onChange={handleChange}
          placeholder="Enter role"
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={review.rating}
          onChange={handleChange}
          placeholder="Enter rating"
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>Quote:</label>
        <textarea
          name="quote"
          value={review.quote}
          onChange={handleChange}
          placeholder="Enter quote"
          required
        />
      </div>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default AddReviewForm;
