import React from 'react';
import { Link } from 'react-router-dom';
import editiconImg from '../../images/editicon.jpg';
import Sidebar from './Sidebar';


const Delivery = () => {
  return (
    <div className="profile-container">
      <div className="profile-box">
       <Sidebar/>
      </div>
      <div className="profile-content">
        <h1 className="pheading">Welcome Tushar!</h1>
        <div className="profile-board">
          <button className="edit-profile"><img src={editiconImg} alt="" /></button>
          <form action="" className="profile-info">
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="add1">Address Line 1 </label>
                <input type="text" name="add1" id="add1" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="add2">Address Line 2</label>
                <input type="text" name="add2" id="add2" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="zip">Postal/Zip</label>
                <input type="text" name="zip" id="zip" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="contact">Contact</label>
                <input type="mnumber" name="mnumber" id="mnumber" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="country">Country</label>
                <input type="text" name="country" id="country" />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="prov">Province</label>
                <input type="text" name="prov" id="prov" />
              </div>
            </div>
            
            
            <button className="save">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
