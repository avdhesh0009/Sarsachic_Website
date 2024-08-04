import React from "react";
import "./ShopSections.css";
import women from "../../images/women.jpg";
import men from "../../images/men.jpg";
import oversized from "../../images/oversized.jpg";
import { Link, useNavigate } from "react-router-dom";

const ShopSections = () => {
  let navigate = useNavigate();
  const handleClick = () => {

    let path = `/mens-section?tab=mens-section`;
    navigate(path);
  }


  return (
    <div className="shop-sections">

      <Link to={"/womens-section?tab=women's fashion"} className="section womens">
        <span className="label">SHOP WOMENS</span>
        <img src={women} alt="Shop Womens" />
      </Link>

      <Link to={"/mens-section?tab=men's fashion"} className="section mens">
        <span className="label">SHOP MENS</span>
        <img src={men} alt="Shop Mens" />
      </Link>
      <div onClick={handleClick} className="section oversized">
        <span className="label">SHOP OVERSIZED</span>
        <img src={oversized} alt="Shop Oversized" />
      </div>
    </div>
  );
};

export default ShopSections;
