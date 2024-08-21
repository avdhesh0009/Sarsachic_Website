import React, { useState } from 'react';
import './Header.css';
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [currency, setCurrency] = useState('INR');
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCurrencyClick = () => {
    setShowCurrencyOptions(!showCurrencyOptions);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setShowCurrencyOptions(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="left-section">
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="currency-selector" onClick={handleCurrencyClick}>
            {currency}
            {showCurrencyOptions && (
              <div className="currency-options">
                <div onClick={() => handleCurrencyChange('USD')}>USD</div>
                <div onClick={() => handleCurrencyChange('INR')}>INR</div>
              </div>
            )}
          </div>
          <Link to={'/mens-section'}>MEN</Link>
          <Link to={'/womens-section'}>WOMEN</Link>
          <Link to={'/accessories'}>ACCESSORIES</Link>
        </nav>
      </div>

      <div className="center-heading">
       <Link to={'/'} ><h1>SARSACHIC</h1></Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="right-section">
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
          <div className={`icon-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to={'/mywishlist'}>  <FaHeart /></Link>
           <Link to={'/cart'}> <FaShoppingCart /></Link>
           <Link to={'/userProfile'}>   <FaUser /> </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
