import React, { createContext, useState } from "react";

export const LoginContext = createContext();
const LoginContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [conPass, setConPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  return (
    <LoginContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        username,
        setUsername,
        pass,
        setPassword,
        conPass,
        setConPassword,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;