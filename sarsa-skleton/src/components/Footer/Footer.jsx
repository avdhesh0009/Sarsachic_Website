// src/Footer.js
import React from "react";
import "./Footer.css"; // Import the CSS file
import { FiMail } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import ContactSection from "./ContactSection";

const Footer = () => {
  return (
    <div className="footer-container-1">
      <ContactSection />
      <div className="footer-1">
        <div className="footer-section">
          <h1>SARSACHIC</h1>
          <p>Reach out to us</p>
          <p className="footer-item">
            <FiMail className="footer-icon" />
            <a href="mailto:sarsa2025@gmail.com">sarsa2025@gmail.com</a>
          </p>
          <p className="footer-item">
            <FaRegClock className="footer-icon" />
            11am to 6pm Mon - Sun*
          </p>
        </div>
        <div className="footer-section">
          <h1>SHOP</h1>
          <p>
            <a href="#">WOMEN</a>
          </p>
          <p>
            <a href="#">MEN</a>
          </p>
          <p>
            <a href="#">ALL</a>
          </p>
        </div>
        <div className="footer-section">
          <h1>SUPPORT</h1>
          <p>
            <a href="#">Privacy policy</a>
          </p>
          <p>
            <a href="#">Return</a>
          </p>
          <p>
            <a href="#">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
