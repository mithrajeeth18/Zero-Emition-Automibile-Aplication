import { useContext, useState } from "react";
import { LoginContext } from "./context/loginSignupContext";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import InstructionPopUp from "./instructionPopup";

const SignUp = () => {
  const {
    username,
    setUsername,
    pass,
    setPassword,
    email,
    setEmail,
    conPass,
    setConPassword,
  } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: "",
    confirmPassword: "",
    userName: "",
    password: "",
    checked: "",
  });
  const [checked, setChecked] = useState(false);
  const [showInstructtionPopup, setShhowInstructionPopup] = useState(false);
  function usernamevalidate(value) {
    let name = value;
    if (name.length < 8) {
      setError({ ...error, userName: "username length should be minimum 8" });
    } else setError({ ...error, userName: "" });
  }
  function emailvalidation(value) {
    let pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let currentEmail = value;
    if (pattern.test(currentEmail)) {
      setError({ ...error, email: "" });
    } else setError({ ...error, email: "Enter a valid email Id" });
  }
  function passwordValidation(value) {
    let newpass = value;
    if (newpass.length < 6) {
      setError({
        ...error,
        password: "minimum length of password should be 6",
      });
    } else setError({ ...error, password: "" });
  }
  function confirmPasswordValidation(value) {
    if (value === pass) {
      setError({ ...error, confirmPassword: "" });
    } else setError({ ...error, confirmPassword: "password is not matching" });
  }

  function sendEmail() {
    return Axios.post("http://localhost:3001/api/email", {
      Email: email,
    });
  }
  function sigupValidtion() {
    !checked
      ? setError({ checked: "please accept the terms and conditions" })
      : setError({ ...error, checked: "" });
    if (
      username.length === 0 ||
      pass.length === 0 ||
      email.length === 0 ||
      conPass.length === 0
    ) {
      setError({ ...error, checked: "Fill all the data  " });
    }
    if (
      error.userName.length === 0 &&
      error.email.length === 0 &&
      error.password.length === 0 &&
      error.confirmPassword.length === 0 &&
      checked
    ) {
      if (
        username.length !== 0 &&
        pass.length !== 0 &&
        email.length !== 0 &&
        conPass.length !== 0
      ) {
        return Axios.post("http://localhost:3001/api/signUp", {
          Username: username,
          Email: email,
          Password: pass,
        }).then(
          Cookies.set("Username", username),
          alert("Acount created"),
          sendEmail(),
          navigate("/createAccount")
        );
      }
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
            max="20"
            min="10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => {
              usernamevalidate(e.target.value);
            }}
          ></input>
          <label
            for="name"
            className={!username ? "labelAnimation" : "labelAfter"}
          >
            Enter Username
          </label>
          {error.userName && (
            <div className="errorText">{`*${error.userName}`}</div>
          )}
        </div>
        <div className="inputDiv">
          <input
            id="email"
            type="text"
            name="email"
            maxlength="25"
            minLength="10"
            max="25"
            min="10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => {
              emailvalidation(e.target.value);
            }}
          ></input>
          <label
            for="email"
            className={!email ? "labelAnimation" : "labelAfter"}
          >
            Enter Email
          </label>
          {error.email && <div className="errorText">{`*${error.email}`}</div>}
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
            onBlur={(e) => {
              passwordValidation(e.target.value);
            }}
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
          {error.password && (
            <div className="errorText">{`*${error.password}`}</div>
          )}
        </div>
        <div className="inputDiv">
          <input
            id="conpass"
            type={"password"}
            minLength="8"
            maxlength="10"
            name="conpass"
            value={conPass}
            onChange={(e) => setConPassword(e.target.value)}
            onBlur={(e) => {
              confirmPasswordValidation(e.target.value);
            }}
          ></input>
          <label
            for="conpass"
            className={!conPass ? "labelAnimation" : "labelAfter"}
          >
            Enter Confirm Password
          </label>
          {error.confirmPassword && (
            <div className="errorText">{`*${error.confirmPassword}`}</div>
          )}
        </div>
        <label class="container">
          By signing up you accept the
          <Link
            onClick={() => {
              setShhowInstructionPopup(true);
            }}
          >
            {" "}
            Terms of Service & Privacy Policy
          </Link>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
          />
          <span class="checkmark"></span>
          {error.checked && (
            <div className="errorText">{`*${error.checked}`}</div>
          )}
        </label>

        <button
          className="buttonStyle"
          style={{ marginTop: "26px" }}
          onClick={() => sigupValidtion()}
        >
          Sign Up
        </button>
        <div className="line" />
        <div
          className="text"
          style={{ marginTop: "9px" }}
          onClick={() => navigate("/login")}
        >
          Already have an account?
          <div style={{ color: "#0B1A50" }}>&nbsp;Login</div>
        </div>
      </div>
      {showInstructtionPopup && (
        <InstructionPopUp
          showInstructtionPopup={showInstructtionPopup}
          setShhowInstructionPopup={setShhowInstructionPopup}
        />
      )}
    </div>
  );
};

export default SignUp;
