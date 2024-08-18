import React from "react";
import "./Products.css";
import heart from "../../images/heart.png";
import plus from "../../images/plus-button.png";

function Products(props) {
  return (
    <div className="product-card-1">
      <div className="product-image-1">
        <img src={props?.data?.images[0]} className="beforeimage" alt="Product" />
        <div className="inner">
          <img src={props?.data?.images[1]} className="afterimage" alt="Product Hover" />
        </div>
      </div>
      <div className="product-details-1">
        <span className="product-title-1">{props?.data?.name}</span>
        <span className="price-1">{props?.data?.price}</span>
        <div className="icons-1">
          <img src={heart} alt="Wishlist" className="heart-1" />
          <img src={plus} alt="Add to Cart" className="plus-1" />
        </div>
      </div>
    </div>
  );
}

export default Products;
