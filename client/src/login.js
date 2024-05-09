import { useContext, useState } from "react";
import { LoginContext } from "./context/loginSignupContext";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const { username, setUsername, pass, setPassword } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function validateFields() {
    if (pass.length === 0 && username.length === 0) {
      setError("Enter UserName and Password");
    } else if (pass.length === 0) {
      setError("Enter Password");
    } else if (username.length === 0) {
      setError("Enter Username");
    } else {
      return Axios.post("http://localhost:3001/api/login", {
        Username: username,
        Password: pass,
      }).then((response) => {
        if (response.data.success) {
          setError("");
          Cookies.set("Username", username);

          alert("login successfull");

          navigate("/home");
        }
        if (response.data.success !== true) {
          setError("Wrong username or password ");
        }
      });
    }
  }

  return (
    <div className="mainDiv">
      <img src="./Logo.svg" alt="logo" className="logoStyle" />
      <div className="border"></div>
      <div className="loginButtonAlignments">
        <div className="inputDiv">
          <input
            id="name"
            type="text"
            name="name"
            maxlength="20"
            minLength="10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label
            for="name"
            className={!username ? "labelAnimation" : "labelAfter"}
          >
            Enter Username
          </label>
        </div>
        <div className="inputDiv">
          <input
            id="pass"
            type={showPassword ? "text" : "password"}
            minLength="8"
            maxlength="10"
            name="pass"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label for="pass" className={!pass ? "labelAnimation" : "labelAfter"}>
            Enter Password
          </label>
          <img
            src={showPassword ? "./showPassword.png" : "./hidePassword.png"}
            alt="showIcon"
            className={showPassword ? "showIcon" : "hideIcon"}
            onClick={() => pass && setShowPassword(!showPassword)}
          />
          {error && <div className="errorText">{`*${error}`}</div>}
        </div>
        <button
          className="buttonStyle"
          style={{ marginTop: "26px" }}
          onClick={() => validateFields()}
        >
          Login
        </button>
        <div className="line" />
        <div className="text" style={{ marginTop: "21px" }}>
          Forgot<div style={{ color: "#0B1A50" }}>&nbsp;Password</div>?
        </div>
        <div
          className="text"
          style={{ marginTop: "9px" }}
          onClick={() => navigate("/signUp")}
        >
          Don’t have an account?
          <div style={{ color: "#0B1A50" }}>&nbsp;Sign up</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
