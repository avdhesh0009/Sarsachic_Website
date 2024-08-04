import React from 'react'

import './RnM.css';
import './ReviewandMembership.css';

// Importing images
import weekendSaleImg from '../../images/weekendsale.png';
import specialDiscountImg from '../../images/specialdiscount.png';
import priorityShopImg from '../../images/priorityshop.png';
import birthdayDiscountImg from '../../images/birthdaydiscount.png';
import img1 from '../../images/img1.jpg';
import starImg from '../../images/star1.png';
import { Link } from 'react-router-dom';



const ReviewandMembership = () => {
  return (
    <div className="desktop-14">
      <div className="desktop-14-child"></div>
      <div className="desktop-14-item"></div>
      <div className="desktop-14-inner"></div>
      <div className="ellipse-div"></div>
      <div className="membership">
        <div className="memberbenefit">
          <div className="memberbenefit-child"></div>
          <div className="weekendsale">
            <div className="weekendsale-child"></div>
            <img className="vector-icon" alt="Weekend Sale" src={weekendSaleImg} />
            <div className="weekend-sale">WEEKEND SALE</div>
          </div>
          <div className="specialdiscounts">
            <div className="weekendsale-child"></div>
            <img className="vector-icon1" alt="Special Discounts" src={specialDiscountImg} />
            <div className="special-discounts">SPECIAL DISCOUNTS</div>
          </div>
          <div className="priorityshop">
            <div className="weekendsale-child"></div>
            <img className="vector-icon2" alt="Priority Shopping" src={priorityShopImg} />
            <div className="priority-shopping">PRIORITY SHOPPING</div>
          </div>
          <div className="birthdaydiscounts">
            <div className="weekendsale-child"></div>
            <div className="birthday-discounts">BIRTHDAY DISCOUNTS</div>
            <img className="gift-icon" alt="Birthday Discounts" src={birthdayDiscountImg} />
          </div>
          <b className="enjoy-these-benefits">ENJOY THESE BENEFITS!</b>
        </div>
        <div className="membership1"><Link to={'/membership'}>  MEMBERSHIP</Link></div>
      </div>
      <div className="reviewsection">
        <div className="reviewsection-child"></div>
        <div className="review-images">
          <img className="img1" alt="Review" src={img1} />
          <img className="mask-group-icon1" alt="Review" src={img1} />
          <img className="mask-group-icon2" alt="Review" src={img1} />
          <img className="mask-group-icon3" alt="Review" src={img1} />
          <img className="mask-group-icon4" alt="Review" src={img1} />
          <img className="mask-group-icon5" alt="Review" src={img1} />
          <div className="review-images-child"></div>
          <div className="review-images-item"></div>
        </div>
        <div className="review1">
          <div className="review1-child"></div>
          <div className="quality-is-good-container">
            <p className="quality-is-good">
              Quality is good colour is very bright and value for money. Love the fabric
            </p>
          </div>
          <img className="star1" alt="Star" src={starImg} />
          <img className="vector-icon4" alt="Star" src={starImg} />
          <img className="vector-icon5" alt="Star" src={starImg} />
          <img className="vector-icon6" alt="Star" src={starImg} />
          <b className="udit">UDIT</b>
        </div>
        <div className="review2">
          <div className="review2-child"></div>
          <div className="such-a-beautiful-container">
            <p className="quality-is-good">
              Such a beautiful t-shirt, awesome fabric, <br /> amazing price and trust me wear it be ready for <br /> all the positive comments that showers ur way
            </p>
          </div>
          <img className="vector-icon7" alt="Star" src={starImg} />
          <img className="vector-icon8" alt="Star" src={starImg} />
          <img className="vector-icon9" alt="Star" src={starImg} />
          <img className="vector-icon10" alt="Star" src={starImg} />
          <img className="vector-icon11" alt="Star" src={starImg} />
          <b className="tania">TANIA</b>
        </div>
        <div className="review3">
          <div className="review3-child"></div>
          <div className="colour-matches-with-container">
            <p className="quality-is-good">Colour matches with the picture,</p>
            <p className="quality-is-good">Quality is good,</p>
            <p className="quality-is-good">Fabric is skin friendly</p>
          </div>
          <img className="vector-icon12" alt="Star" src={starImg} />
          <img className="vector-icon13" alt="Star" src={starImg} />
          <img className="vector-icon14" alt="Star" src={starImg} />
          <b className="sam">SAM</b>
        </div>
        <div className="review4">
          <div className="review2-child"></div>
          <div className="nice-t-shirt-and-container">
            <p className="quality-is-good">
              Nice t-shirt and the quality same as shown in ad
            </p>
          </div>
          <img className="icon-star" alt="Star" src={starImg} />
          
          <b className="tan">TAN</b>
        </div>
        <span className="reviewhead">
          <div className="reviewhead-child"></div>
          <b className="reviews">REVIEWS</b>
        </span>
      </div>
    </div>
  )
}

export default ReviewandMembership