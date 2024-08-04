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


function MensSection() {

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const axios = useAxiosPublic()

  const [pageData, setPageData] = useState({})


  const paramValue = searchParams.get('tab');
  console.log(paramValue);




  useEffect(() => {
    const getpageData = async () => {
      await axios(`/users/shop-data/${paramValue}`)
        .then((res) => {
          setPageData(res.data.data)

        })
    }

    getpageData()
  }, [])


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
          <img src={pageData.themeImage || Men} alt="" />
        </div>

        <div className="mens-category">
          <span>Mens</span>
          <span>Sort By Latest</span>
        </div>

        <div className="mens-products-container">
          <div className="scroll-section-2">
            <div className="products-single-mens">
              <Products
                img1={image1}
                img2={demonimg}
                price="RS. 699"
                name="Goku Oversized Tshirt"
              />
              <Products
                img1={image2}
                img2={hoverimg}
                price="RS. 699"
                name="Never Fear oversized Tshirt"
              />
              <Products
                img1={image2}
                img2={hoverimg}
                price="RS. 699"
                name="Never Fear oversized Tshirt"
              />

            </div>
            <div className="products-single-mens">
              <Products
                img1={image1}
                img2={demonimg}
                price="RS. 699"
                name="Goku Oversized Tshirt"
              />
              <Products
                img1={image2}
                img2={hoverimg}
                price="RS. 699"
                name="Never Fear oversized Tshirt"
              />
              <Products
                img1={image2}
                img2={hoverimg}
                price="RS. 699"
                name="Never Fear oversized Tshirt"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MensSection