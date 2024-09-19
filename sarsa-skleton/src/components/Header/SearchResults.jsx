import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // Import the CSS file for styling
import img from '../../images/ts1.png'

const SearchResults = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();

  const products = [
    { name: 'Regular Tshirt', category: 'Men', image: img },
    { name: 'Oversized Tshirt', category: 'Men', image: img },
    { name: 'Bottoms', category: 'Men', image: img },
    { name: 'Accessories', category: 'Men', image: img },
    { name: 'Caps', category: 'Men', image: img },
    { name: 'Co Ords', category: 'Men', image: img },
    { name: 'Shorts', category: 'Women', image: img },
    { name: 'Dresses', category: 'Women', image: img },
    { name: 'Skirts', category: 'Women', image: img }
  ];

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    setSearchTerm(query || '');
    if (query) {
      const results = products.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [location.search]);

  const handleAddToCart = (productName) => {
    // Add logic to handle adding product to cart
    alert(`${productName} added to cart!`);
  };

  return (
    <div className="search-results-page">
      <h1>Search Results for "{searchTerm}"</h1>
      <div className="card-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>Category: {product.category}</p>
                <button className="add-to-cart-button" onClick={() => handleAddToCart(product.name)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
