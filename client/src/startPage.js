import React from "react";
import { useNavigate } from "react-router-dom";
const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mainDiv">
      <img src="./Logo.svg" alt="logo" className="logoStyle" />
      <div className="border"></div>
      <div className="buttonAlignment">
        <button className="buttonStyle" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="buttonStyle" onClick={() => navigate("/signUp")}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default StartPage;
