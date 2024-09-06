import Hero from '../Hero/Hero'
import React, { useContext, useState } from "react";
import ProductPage from "../ProductPage/ProductPage";
import ProductBar from "../../components/ProductBar/ProductBar";
import ShopSections from "../../pages/Shop/ShopSections";
import './Home.css'
import Poster from '../Hero/Poster.jsx'
import DealsOfTheMonth from '../Products/DealsOfTheMonth.jsx'
import NewArrivals from '../Products/NewArrivals.jsx'
import ReviewandMembership from '../../components/Membership/ReviewandMembership.jsx';
import { WebContext } from '../../providers/WebProvider.jsx';
import JustDrop from '../Products/JustDrop.jsx';
import Rev from '../../components/Membership/Rev.jsx';
import Member from '../../components/Membership/Member.jsx';


function Home() {

    const {webData} = useContext(WebContext)


    return (
        <div className='home-container'>
            <Hero webData={webData} />
            <ProductBar webData={webData} />
            <DealsOfTheMonth webData={webData} />
            <NewArrivals />
            <ShopSections />
            <JustDrop/>
            <Rev/>
            <Member/>
           
        </div>
    )
}

export default Home