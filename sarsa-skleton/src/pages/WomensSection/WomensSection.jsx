import React from 'react'
import './WomensSection.css'
import Women from '../../images/womenBanner.png'
import Products from "../Products/Products";
import image1 from "../../images/q.jpeg";
import image2 from "../../images/3.png";
import hoverimg from "../../images/2.png";
import demonimg from "../../images/demon.png";


function WomensSection() {
    return (
        <div className="mens-frame">
            <div className="mens-section">
                <div className="scroll-bar">
                    <ul>
                        <li><button className='section-btn'>Mens Fashion</button></li>
                        <li><button className='section-btn active'>Womens Fashion</button></li>
                        <li><button className='section-btn' >Womens Accessories</button></li>
                        <li><button className='section-btn'>Mens Accessories</button></li>
                        <li><button className='section-btn'>Discount Deals</button></li>
                    </ul>
                </div>

                <div className="womens-banner">
                    <img src={Women} alt="" />
                </div>

                <div className="category">
                    <span>Womens</span>
                    <span>Sort By Latest</span>
                </div>

                <div className="mens-products-container">
                    <div className="scroll-section-2">
                        <div className="products-single">
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
                        <div className="products-single">
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

export default WomensSection