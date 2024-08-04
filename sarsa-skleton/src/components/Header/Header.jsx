import React, { useState } from "react";
import "./Header.css";
import { FaRegUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  let navigate = useNavigate();
  const cart = () => {
    let path = `cart`;
    navigate(path);
  };
  return (
    <header className="header-navbar">
      <div className="header-left">
        <ul className="left-header-icons">
          <li className="currency-header">
            <select name="" id="">
              <option value="">INR </option>
              <option value="">USD <IoMdArrowDropdown /></option>

            </select>

          </li>
          <li>MEN</li>
          <li>WOMEN</li>
          <li>ASSCESSORIES</li>
        </ul>
      </div>
      <div className="header-section">
        <div className="logo">
          <Link to="/">SARSACHIC</Link>
        </div>
      </div>

      <div className="header-right">
        <ul className="right-header-icons">
          <li>About Us</li>
          <li>Contact Us</li>
          <li><Link to={'/wishlist'}>  <FaRegHeart /></Link></li>
          <li><Link to={'/userProfile'}><FaRegUser /></Link></li>
          <li onClick={cart}><FiShoppingCart /></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
