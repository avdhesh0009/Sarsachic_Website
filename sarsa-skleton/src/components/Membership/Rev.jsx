import React from 'react';
import './Rev.css';

// Import images
import img1 from '../../images/rev1.png';
import img2 from '../../images/rev2.png';
import img3 from '../../images/rev3.png';
import img4 from '../../images/rev4.png';
import img5 from '../../images/rev5.png';
import img6 from '../../images/rev6.png';

const reviews = [
  {
    name: 'John Doe',
    review: 'Great product! Highly recommend it.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    review: 'It works well, but there are some issues.',
    rating: 4,
  },
  {
    name: 'Emily Johnson',
    review: 'Not what I expected, but still okay.',
    rating: 3,
  },
  {
    name: 'Michael Brown',
    review: 'Amazing! Will definitely buy again.',
    rating: 5,
  }
];

const images = [
  { src: img1, className: 'img11' },
  { src: img2, className: 'img2' },
  { src: img3, className: 'img3' },
  { src: img4, className: 'img4' },
  { src: img5, className: 'img5' },
  { src: img6, className: 'img6' }
];

const Rev = () => {
  return (
    <div className="review-containerr">
      <div className="review-contentt">
        <h2 className="review-headingg">REVIEWS</h2>
        <div className="reviewss">
          {reviews.map((item, index) => (
            <div className="review-block" key={index}>
              <div className="review-header">
                <h2>{item.name}</h2>
                <div className="stars">
                  {'★'.repeat(item.rating) + '☆'.repeat(5 - item.rating)}
                </div>
              </div>
              <p>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="review-image">
        {images.map((image, index) => (
          <img 
            src={image.src} 
            alt={`Review image ${index + 1}`} 
            key={index} 
            className={image.className} 
          />
        ))}
      </div>
    </div>
  );
};

export default Rev;
