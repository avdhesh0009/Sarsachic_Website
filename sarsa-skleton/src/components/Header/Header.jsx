import "./Header.css";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Header.css";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  let navigate = useNavigate();
  const cart = () => {
    let path = `cart`;
    navigate(path);
  };

  return (
    <header className="header">
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
   <Link to='/'> <div className="headinghdr">SARSACHIC</div></Link>
    <ul className="right-header-icons">
      <li>About Us</li>
      <li>Contact Us</li>
      <li ><Link to={'/wishlist'}><FaRegHeart className="iconhdr" /></Link></li>
      <li ><Link to={'/userProfile'}><FaRegUser  className="iconhdr"/></Link></li>
      <li onClick={cart} ><FiShoppingCart className="iconhdr"/></li>
    </ul>
  </header>
  );
};

export default Header;