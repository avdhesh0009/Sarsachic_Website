import "./ForgetPass.css";
import image from "../../images/n-1.jpeg";
import Google from "../../images/search-1.png";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Login from "../Login/Login";
import { useState } from "react";
import useAxiosPublic from '../../hooks/useAxios';

function NewPassword() {
  const navigate = useNavigate();
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [message,setMessage] = useState('');
  const {userId,token} = useParams();
  const axios = useAxiosPublic();

  const handleResetPassword = async () => {
      setPassword('');
      setConfirmPassword('');
      try{
        const response = await axios.post(`/users/reset-password/${userId}/${token}`,{
          password,
          confirmPassword
        })
        console.log(response);
        if (response.data && response.data.success) {
            setMessage('Passowrd Changed successful! Redirecting Login Page...');
            setTimeout(() => {
              navigate(`/login`);
            }, 5000);
        }else{
          setMessage('Password Changed failed. Please try again.');
        }
      }
      catch (error) {
        setMessage('An error occurred during changing password')
      }
  }
  return (
    <div className="forgot-container">
      <div className="forgot-section-1">
        <div className="forgot-text">
          <h1>Lost password</h1>
          <span>
            Lost your password? Please enter your
            <br /> username or email address.
          </span>
        </div>
        {message && (
          <div>
            {message}
          </div>
        )}
        <div className="forgot-input-wrapper">
          <form action="" method="" className="forgot-input">
            <label htmlFor="input-box">New Password</label>
            <input
              type="text"
              placeholder=" Enter your new Password"
              id="input-box"
              value={password}
              onChange={ev=>setPassword(ev.target.value)}
            />
            <label htmlFor="input-box">Confirm Password</label>
            <input
              type="text"
              placeholder=" Confirm Your Password"
              id="input-box"
              value={confirmPassword}
              onChange={ev=>setConfirmPassword(ev.target.value)}
            />
          </form>
        </div>

        <div className="button">
          <button class="forgot-button" onClick={handleResetPassword}>Reset Password</button>
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

export default NewPassword;
