import React from "react";
import "./Products.css";
import heart from "../../images/heart.png";
import plus from "../../images/plus-button.png";

function Products(props) {
  console.log(props);
  return (
    <div className="product-card-1">
      <div className="product-image-1">
        <img src={props?.data?.images[0]} className="beforeimage" />
        <img src={heart} alt="" className="heart-1" />
        <div className="inner">
          <img src={props?.data?.images[1]} className="afterimage" />
        </div>
      </div>
      <div className="product-details-1">
        <div className="title-1">
          <span className="product-title-1">{props?.data?.name}</span>
          <img src={plus} className="plus-1" />
        </div>
        <span className="price-1">{props?.data?.price}</span>
      </div>
    </div>
  );
}

export default Products;
