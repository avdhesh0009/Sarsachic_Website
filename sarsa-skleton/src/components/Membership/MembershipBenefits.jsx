import React from 'react';
import './MembershipBenefits.css';
import birthdayIcon from '../../images/birthdaydiscount.png';
import priorityIcon from '../../images/priorityshop.png';
import specialIcon from '../../images/specialdiscount.png';
import weekendIcon from '../../images/weekendsale.png';
import crownIcon from '../../images/crown.png';
import crownIcon1 from '../../images/crown1.png';
import { FaArrowRight } from 'react-icons/fa'; 

const MembershipBenefits = () => {
    return (
        <>

            <div className="membership-container">

                <div className="membership-card">

                    <img src={crownIcon} alt="Crown" className="crown" />
                    <div className="head">
                        <h2>MEMBERSHIP</h2>
                        <p>BENEFITS</p>
                    </div>
                    <ul>
                        <li>
                            <img src={birthdayIcon} alt="Birthday" className="icon" />
                            <div className="text">
                                <hr className="line" />
                                <h3>BIRTHDAY DISCOUNTS</h3>

                                <p>Get special discounts and gift cards on your birthday!</p>
                            </div>
                        </li>
                        <li>
                            <img src={priorityIcon} alt="Priority Shopping" className="icon" />
                            <div className="text">
                                <hr className="line" />
                                <h3>PRIORITY SHOPPING</h3>
                                <p>Get easily access on our products before others have with free shipping!</p>
                            </div>
                        </li>
                        <li>
                            <img src={specialIcon} alt="Special Discounts" className="icon" />
                            <div className="text">
                                <hr className="line" />
                                <h3>SPECIAL DISCOUNTS</h3>
                                <p>Get special discounts on our all products everyday.</p>
                            </div>
                        </li>
                        <li>
                            <img src={weekendIcon} alt="Weekend Sale" className="icon" />
                            <div className="text">
                                <hr className="line" />
                                <h3>WEEKEND SALE</h3>
                                <p>Special stock for our members during our sale.</p>
                            </div>
                        </li>
                    </ul>
                    <div className="price">Rs.120/ 6 months</div>
                </div>
                <div className="another-plan">

                    <div className="ap">
                        <div className="flip">
                        <span className="flipped-text">SEE ANOTHER PLAN</span>
                        </div>
                    
                    <div className="crbtn">
                        <img src={crownIcon1} alt="Crown" className="crown-icon1" />
                        <button>CLICK TO SEE ANOTHER PLAN  <br /> <FaArrowRight className="arrow-icon" /></button>
                       

                    </div>

                    </div>
                </div>


            </div>
        </>);
};

export default MembershipBenefits;
