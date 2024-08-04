import React, { useContext } from "react";
import Google from "../images/search-1.png";
import "../pages/SignUp/SignUp.css";
import { app } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxios";
import { WebContext } from "../providers/WebProvider";

function OAuth() {
  const axios = useAxiosPublic();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser, user } = useContext(WebContext);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const response = await axios.post(
        "/users/auth/google",
        {
          username: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      setUser(response.data.data);
      // const data = response.data;
      // console.log(data);
      // localStorage.setItem('sarsaUser', JSON.stringify({user:data.data.user, accessToken : data.data.accessToken}));
      navigate(location.state?.from ? location.state.from : "/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="Google-button" onClick={handleGoogleClick}>
      <img src={Google} alt="Google" />
      Sign In With Google
    </button>
  );
}

export default OAuth;
