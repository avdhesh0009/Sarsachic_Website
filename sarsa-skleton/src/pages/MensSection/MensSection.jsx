import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import './MensSection.css'
import Men from '../../images/menBanner.png'
import Products from "../Products/Products";
import image1 from "../../images/q.jpeg";
import image2 from "../../images/3.png";
import hoverimg from "../../images/2.png";
import demonimg from "../../images/demon.png";
import useAxiosPublic from '../../hooks/useAxios';
import './../Products/NewArrivals.css'


function MensSection() {

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const axios = useAxiosPublic()

  const [pageData, setPageData] = useState({})
  const paramValue = searchParams.get('tab');
  console.log(paramValue);

  const navigate = useNavigate();

  const [products,setProducts]=useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [SelectedFilters, setSelectedFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2] = await Promise.all([
          axios.get(`/users/shop-data/${paramValue}`),
          axios.get(`/products/${paramValue}-products`)
        ]);
        // console.log('data1', data1, 'data2', data2.data);
        // console.log(data2.data.data);
        setProducts(data2.data.data);
      } catch (error) {
        console.error('Error making requests:', error);
      }
    };
  
    fetchData();
  }, [SelectedFilters]);  

  return (
    <div className="mens-frame">
      <div className="mens-section">
      <div className="scroll-bar">
                    <ul>
                        <li><button className='section-btn active'>Mens Fashion</button></li>
                        <li><button className='section-btn'>Womens Fashion</button></li>
                        <li><button className='section-btn' >Womens Accessories</button></li>
                        <li><button className='section-btn'>Mens Accessories</button></li>
                        <li><button className='section-btn'>Discount Deals</button></li>
                    </ul>
                </div>
        <div className="mens-banner">
          <img src={pageData?.themeImage || Men} alt="" />
        </div>

        <div className="mens-category">
          <span>Mens</span>
          <span>Sort By Latest</span>
        </div>

        <div className="mens-products-container">
            <div className="products-single-mens">
              {products.map((product, index) => (
                <Products key={index} data={product}/>
              ))}
            </div> 
        </div>
      </div>
    </div>
  )
}

export default MensSection