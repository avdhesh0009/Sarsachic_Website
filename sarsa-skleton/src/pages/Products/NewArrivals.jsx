import React, { useEffect, useState } from "react";
import "./NewArrivals.css";

import img1 from "../../images/shiny-dress.jpg";
import img2 from "../../images/shiny-dress.jpg";
import img3 from "../../images/full-sweater.png";
import img4 from "../../images/white-dress.png";
import img5 from "../../images/colorful-dress.png";
import img6 from "../../images/white-shirt.png";
import { Link, Navigate, useNavigate} from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";
import ProductDetails from "./ProductDetails";

const NewArrivals = () => {
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const [products,setProducts]=useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [SelectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(products);
  let filters = ['women', 'men', 'assesories', 'discount', 'oversized'];

  const handlecategory = (selectedCategory) => {
    if (SelectedFilters.includes(selectedCategory)) {
      let filters = SelectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...SelectedFilters, selectedCategory]);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('/products/getAllProducts');
      setProducts(response.data);
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (SelectedFilters.length > 0) {
      let TempItems = SelectedFilters.map((selectedCategory) => {
        let temp = products.filter((product) => product.category === selectedCategory);
        return temp;
      });
      setFilteredItems(TempItems.flat());

    } else {
      setFilteredItems([...products]);

    }
  }, [SelectedFilters])


  // const featuredProductsFetch = async () => {
  //   try {
  //     const res = await axios.get("/users/featured-products");
  //     console.log(res);
  //     setFeaturedProducts(res.data);
  //   } catch (error) {
  //     console.error("Error fetching featured products:", error);
  //   }
  // };

  // useEffect(() => {
  //   featuredProductsFetch();
  // }, []);

  const handleImageClick = (productId) => {
    navigate(`/product-section/${productId}`);
  };
  return (
    <div className="new-arrivals">
      <h1>New Arrivals</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis ultrices sollicitudin aliquam sem.
        <br /> Scelerisque duis ultrices sollicitudin
      </p>
      <div className="tabs">
        {filters.map((category, idx) => (
          <button
            onClick={() => handlecategory(category)} className={`button-category ${SelectedFilters?.includes(category) ? "active" : ""
              }`}
            key={`filters-${idx}`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="products-arrival">
        {filteredItems.map((product, index) => (
          <div className="product-card-arrival" key={index}>
            <img src={product.images[0]} alt={product.name} 
                onClick={() => handleImageClick(product._id)}
                style={{ cursor: 'pointer' }} 
            />
            <div className="product-info-arrival">
              <h2 id="name-arrival">{product.name}</h2>
              <p>{product.name}</p>
              <div className="rating-arrival">
                {product.price}
              </div>
              <p>{product.stockQuantity} Customer Reviews</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="products-arrival">
        {/* {featuredProducts.map((product, index) => (
          <Link to={`/product-section?id=${product._id}`} key={index}>
            <div className="product-card">
              <img src={product.images[0]} alt={product.name} />
              <div className="product-info-arrival">
                <h2 id="name">{product.name}</h2>
                <p>{product.category}</p>
                <p>{product.reviews} Customer Reviews</p>
                <h3>${product.price.toFixed(2)}</h3>
              </div>
            </div>
          </Link>
        ))} */}
      </div>
      <button className="view-more"><Link to={'/product-section'}>  View More </Link></button>
    </div>
  );
};

export default NewArrivals;
