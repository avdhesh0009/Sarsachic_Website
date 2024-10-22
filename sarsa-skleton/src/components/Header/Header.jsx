import React, { useState, useRef, useEffect, useContext } from "react";
import { FaBars, FaTimes, FaRegUser, FaTimes as FaTimesIcon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TfiSearch } from "react-icons/tfi";
import { GoHeart, GoArrowUpRight } from "react-icons/go";
import { BsCart } from "react-icons/bs";
import regularTshirt from '../../images/regularTshirt.png';
import oversizedTshirt from '../../images/oversizedTshirt.png';
import bottoms from '../../images/bottoms.png';
import assesories from '../../images/assesories.png';
import caps from '../../images/caps.png';
import coords from '../../images/coords.png';
import './Header.css';
import { WebContext } from "../../providers/WebProvider";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('men');
  const [selectedCurrency, setSelectedCurrency] = useState('Currency');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);


  const selectorRef = useRef(null);

  const navigate  = useNavigate();

  const {user} = useContext(WebContext);
  console.log(user);

  const handleClickOutside = (event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSelectorClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm('');
      setSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleProfile = (data) => {
    if (!user) {
      navigate('/login'); // Programmatically navigate to the login page
    } else {
      navigate(data); // Programmatically navigate to the user profile page
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </button>

        <div className="desktop-links">
          <div className="selector" ref={selectorRef}>
            <div className="selected" onClick={handleSelectorClick}>
              {selectedCurrency}
            </div>
            {isOpen && (
              <div className="options">
                <div className="option" onClick={() => handleOptionClick('INR')}>INR</div>
                <div className="option" onClick={() => handleOptionClick('USD')}>USD</div>
              </div>
            )}
          </div>
          <Link to="/mens-section">Accessories</Link>
          <Link to="/about">About Us</Link>

          {/* Search Icon */}
          <TfiSearch className="icon" onClick={toggleSearch} />
        </div>
      </div>

      <div className="header-center">
        <Link to="/"> <h1>SARSACHIC</h1> </Link>
      </div>

      <div className="header-right">
        {/* Links visible only on larger screens */}
        <div className="desktop-links">
         <Link to="/contact">Contact Us</Link>
        </div>
       <GoHeart className="icon" onClick={()=>handleProfile('/mywishlist')}/>
       <BsCart className="icon" onClick={()=>handleProfile('/cart')} />
        {/* <Link to="/userProfile">  <FaRegUser className="icon" /></Link> */}
      <FaRegUser className="icon" onClick={()=>handleProfile('/userProfile')} />
      </div>

      {menuOpen && (
        <nav className="sidebar-menu">
          <div className="sidebar-content">
            <div className="sidebar-category">
              <div className="sidebar-tabs">
                <button
                  className={`category-tab ${activeCategory === 'men' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('men')}
                >
                  Shop Men
                </button>
                <button
                  className={`category-tab ${activeCategory === 'women' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('women')}
                >
                  Shop Women
                </button>
              </div>

              <h3>{activeCategory === 'men' ? 'SHOP ALL CATEGORIES FOR MEN' : 'SHOP ALL CATEGORIES FOR WOMEN'}</h3>

              <div className="category-list">
                <a href="#" className="category-item">
                  <img src={regularTshirt} alt="Regular Tshirt" />
                  <span>{activeCategory === 'men' ? 'Regular Tshirt' : 'Shorts'}</span>
                </a>
                <a href="#" className="category-item">
                  <img src={oversizedTshirt} alt="Oversized Tshirt" />
                  <span>{activeCategory === 'men' ? 'Oversized Tshirt' : 'Dresses'}</span>
                </a>
                <a href="#" className="category-item">
                  <img src={bottoms} alt="Bottoms" />
                  <span>{activeCategory === 'men' ? 'Bottoms' : 'Skirts'}</span>
                </a>
                <a href="#" className="category-item">
                  <img src={assesories} alt="Accessories" />
                  <span>Accessories</span>
                </a>
                <a href="#" className="category-item">
                  <img src={caps} alt="Caps" />
                  <span>Caps</span>
                </a>
                <a href="#" className="category-item">
                  <img src={coords} alt="Co Ords" />
                  <span>Co Ords</span>
                </a>
              </div>

              <div className="other">
                <a href="#" className="category-item">
                  <span>About Us <GoArrowUpRight /></span>
                </a>
                <a href="#" className="category-item">
                  <span>Contact Us <GoArrowUpRight /></span>
                </a>
              </div>

              <div className="currency-selector">
                <h4>Select Currency</h4>
                <button
                  className={`currency-button ${selectedCurrency === 'INR' ? 'active' : ''}`}
                  onClick={() => handleOptionClick('INR')}
                >
                  INR
                </button>
                <button
                  className={`currency-button ${selectedCurrency === 'USD' ? 'active' : ''}`}
                  onClick={() => handleOptionClick('USD')}
                >
                  USD
                </button>
              </div>
            </div>
          </div>

          <button className="close-icon" onClick={toggleMenu}>
            <FaTimes />
          </button>
        </nav>
      )}

      {/* Search Popup */}
      {searchOpen && (
        <div className="search-popup">
          <button className="search-popup-close" onClick={toggleSearch}>
            <FaTimesIcon />
          </button>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()} // Handle 'Enter' key
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
      )}
    </header>
  );
};

export default Header;
