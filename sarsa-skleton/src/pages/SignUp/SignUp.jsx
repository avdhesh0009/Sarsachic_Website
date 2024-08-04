import React, { useState } from "react";
import image from "../../images/n-1.jpeg";
import Google from "../../images/search-1.png";
import { Link, NavLink } from "react-router-dom";
import Login from "../Login/Login";
import "./SignUp.css";
import OAuth from "../../components/OAuth";
import useAxiosPublic from "../../hooks/useAxios";

function SignUp() {
  const [username,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const axios = useAxiosPublic();

  const handleSubmit = async () =>{
    try{
      const response = await axios.post('/users/register',{
        username,
        email,
        password
      })
      console.log(response.data);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="sign-container">
      <div className="sign-section-1">
        <div className="sign-text">
          <h1>Welcome Back</h1>
          <span>Welcome back! Please enter Your details</span>
        </div>

        <div className="sign-input-wrapper">
          <form action="" method="" className="sign-input">
            <label htmlFor="input-box">Name</label>
            <input
              type="email"
              placeholder=" Enter Your Name "
              id="input-box"
              value={username}
              onChange={ev=>setName(ev.target.value)}
            />
            <label htmlFor="input-box">Email</label>
            <input
              type="email"
              placeholder=" Enter your email"
              id="input-box"
              value={email}
              onChange={ev=>setEmail(ev.target.value)}
            />

            <label htmlFor="input-box">Password</label>
            <input 
            type="password" 
            placeholder=" *********" 
            id="input-box" 
            value={password}
            onChange={ev=>setPassword(ev.target.value)}
            />
          </form>
        </div>

        <div className="sign-in-wrapper">
          <div class="sign-remember-checkbox-wrapper">
            <input class="sign-remember-checkbox" type="checkbox" />
            <span>Remember Me</span>
          </div>
        </div>

        <div className="button">
          <button class="sign-in-button" onClick={handleSubmit}>Register</button>
          <OAuth/>
        </div>

        <div class="dont-have-an-account-log-in-wrapper">
          <div class="login-dont-have-an-container">
            <span class="login-dont-have-an">Already have an account?</span>
            <span class="span"> </span>
            <Link to="/login" class="sign-up-fo">
              Login here!
            </Link>
          </div>
        </div>
      </div>

      <div className="sign-section-2">
        <img className="sign-cover-img" src={image} alt="" />
      </div>
    </div>
  );
}

export default SignUp;
