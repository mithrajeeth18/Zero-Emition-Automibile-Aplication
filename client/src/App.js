import React from "react";
import "./index.css";

import StartPage from "./startPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import CreateAccount from "./createAccount";
import Home from "./home";
import LoginContextProvider from "./context/loginSignupContext";
import SignUp from "./signUp";
import Modal from "./update";
function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route exact path="/" element={<StartPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/createAccount" element={<CreateAccount />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/update" element={<Modal />} />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  );
}

export default App;
