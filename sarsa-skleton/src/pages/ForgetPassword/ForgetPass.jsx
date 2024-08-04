import "./ForgetPass.css";
import image from "../../images/n-1.jpeg";
import Google from "../../images/search-1.png";
import { Link, NavLink } from "react-router-dom";
import Login from "../Login/Login";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  let navigate = useNavigate();
  const handleClick = () => {
    let path = `new-password`;
    navigate(path);
  };
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

        <div className="forgot-input-wrapper">
          <form action="" method="" className="forgot-input">
            <label htmlFor="input-box">Email</label>
            <input
              type="email"
              placeholder=" Enter your email"
              id="input-box"
            />
          </form>
        </div>

        <div className="button">
          <button class="forgot-button" onClick={handleClick}>
            Reset Password
          </button>
        </div>

        <div class="dont-have-an-account-log-in-wrapper">
          <div class="login-dont-have-an-container">
            <span class="login-dont-have-an">Alreeady have an account?</span>
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

export default ForgetPass;
