import React, { useState } from 'react';
import './ContactSection.css';
import { FaInstagram, FaFacebook} from "react-icons/fa";
import {FaXTwitter}  from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxios";

const ContactSection = () => {
  const [email,setEmail] = useState('');
  const axios = useAxiosPublic();
  const handleSubmit = async (ev) =>{
    ev.preventDefault();
    try {
      const response = await axios.post('/promotion/join-us',{
        email
      })
      if(response.data.success){
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="contact-section">
       <span className="contact-text">BE IN TOUCH WITH US</span>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            className="email-input"
            value={email}
            onChange={ev=>setEmail(ev.target.value)}
          />
          <button className="join-button">JOIN US</button>
        </form>
      </div>
      <div className="social-icons">
        <FaInstagram className="social-icon" />
        <FaFacebook className="social-icon" />
        <FaXTwitter className="social-icon" />
      </div>
    </div>
  );
}

export default ContactSection;
