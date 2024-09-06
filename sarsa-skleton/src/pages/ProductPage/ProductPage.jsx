import React from "react";
import Products from "../Products/Products";
import "./ProductPage.css";
import image1 from "../../images/q.jpeg";
import image2 from "../../images/3.png";
import hoverimg from "../../images/2.png";
import demonimg from "../../images/demon.png";

function ProductPage() {
  return (
    <div className="page-wrapper">
      <div className="page-title">
        <h1>PRODUCTS</h1>
      </div>
      <div className="allproducts-container">
        <div className="scroll-section">
          <div className="products">
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
          </div>
          <div className="products">
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
          </div>
        </div>

        <div className="fixed-section">
          <img src={image2} alt="" />
          <button className="shop-button">SHOP NOW</button>
        </div>
      </div>
      <div class="explore-more1">
        <button>EXPLORE MORE</button>
      </div>
    </div>
  );
}

export default ProductPage;
