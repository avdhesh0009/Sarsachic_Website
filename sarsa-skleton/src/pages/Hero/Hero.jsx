import React, { useEffect, useState } from "react";
import cover from "../../images/model2.png";
import ProductPage from "../ProductPage/ProductPage";
import "./Hero.css";
import ProductBar from "../../components/ProductBar/ProductBar";
import ShopSections from "../../pages/Shop/ShopSections";
import useAxiosPublic from "../../hooks/useAxios";

const Hero = ({ webData }) => {

  console.log(webData);

  return (
    <div className="App">
      <div style={{ backgroundColor: webData?.secondaryColor }} className="leftPartition">
        <div className="left-text">
          <p className="description-2">
            Transform your look with the latest in stree <br />
            fashion. Urban vibes, unstoppable trends.
          </p>
          <button style={{ backgroundColor: webData.mainColor }} className="actionButton">SHOP NOW</button>
        </div>
      </div>
      <div style={{ backgroundColor: webData.mainColor }} className="rightPartition"></div>
      <div className="model-img">
        <img src={webData.homeBannerImage || cover} />
      </div>
      <div className="logo-written">
        <span className="logoText">SARSACHIC</span>
      </div>
    </div>
  );
};

export default Hero;
