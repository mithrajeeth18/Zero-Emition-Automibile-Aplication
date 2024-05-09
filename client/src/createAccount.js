import { useState, useContext } from "react";
import { LoginContext } from "./context/loginSignupContext";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const CreateAccount = () => {
  const username = Cookies.get("Username");
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState({ userName: username });
  const [error, setError] = useState({});
  const [TodaysDate, setTodaysDate] = useState("");
  const validateRegex = {
    name: /^[a-zA-Z ]+$/,
    license:
      /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
    aadhar:
      /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
    registrationNumber:
      /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
  };
  const list = [
    { onlyText: "Enter your details :", noInput: true },
    {
      label: "Your Username",
      type: "text",
      length: "20",
      id: "userName",
      readonly: true,
    },
    {
      label: "Your name",
      type: "text",
      length: "20",
      id: "name",
    },
    {
      label: "Aadhar No.",
      type: "text",
      length: "20",
      id: "aadhar",
    },
    {
      label: "Driving License No.",
      type: "text",
      length: "20",
      id: "license",
    },
    { onlyText: "Enter your vehicle details :", noInput: true },

    {
      label: "Vehicle Model Name",
      type: "text",
      length: "20",
      id: "vehicleModalName",
    },
    {
      label: "Vehicle Registration No. ",
      type: "text",
      length: "20",
      id: "registrationNumber",
    },
    {
      label: "Vehicle Purchasing Date",
      type: "date",
      length: "20",
      id: "vehiclePurchaseDate",
    },
    {
      label: "Vehicle Company Name",
      type: "text",
      length: "20",
      id: "vehicleCompanyName",
    },
    { onlyText: "Enter your vehicle PUC details :", noInput: true },
    {
      label: "PUC Purchasing Date ",
      type: "date",
      length: "8",
      id: "purchaseDate",
    },
    {
      label: "PUC Center Name",
      type: "text",
      length: "20",
      id: "centerName",
    },
    { onlyText: "Enter your vehicle servicing details :", noInput: true },
    {
      label: "Vehicle Last Servicing Date ",
      type: "date",
      length: "20",
      id: "vehicleServiceDate",
    },
  ];
  const onChangeValue = (value, id) => {
    setAccountDetails({ ...accountDetails, [id]: value });
    setError({ ...error, [id]: "" });
  };

  function validateFields1(value, id, label, type) {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    setTodaysDate(`${year}-${month}-${day}`);

    if (value === "") {
      setError({ ...error, [id]: "This field is required" });
    } else if (id === "aadhar") {
      if (!validateRegex.aadhar.test(value)) {
        setError({ ...error, [id]: `Please enter valid aadhar number` });
      }
    } else if (id === "license") {
      if (!validateRegex.license.test(value))
        setError({ ...error, [id]: `Please enter valid license number` });
    } else if (id === "registrationNumber") {
      if (!validateRegex.registrationNumber.test(value))
        setError({ ...error, [id]: `Please enter valid registration number` });
    } else if (
      id === "name" ||
      id === "vehicleModalName" ||
      id === "vehicleCompanyName" ||
      id === "centerName"
    ) {
      if (!validateRegex.name.test(value))
        setError({ ...error, [id]: `Please enter ${label} properly ` });
    }
  }
  function send1() {
    console.log("connect to db user info");

    return Axios.post("http://localhost:3001/api/create", {
      Name: accountDetails.name,
      Adhar: accountDetails.aadhar,
      License: accountDetails.license,
      userName: accountDetails.userName,
    }).then(send2());
  }

  function send2() {
    console.log("connect vehical DB");
    return Axios.post("http://localhost:3001/api/create1", {
      username: accountDetails.userName,
      Name: accountDetails.name,
      model: accountDetails.vehicleModalName,
      registration: accountDetails.registrationNumber,
      v_purchase: accountDetails.vehiclePurchaseDate,
      v_company: accountDetails.vehicleCompanyName,
      p_purchase: accountDetails.purchaseDate,
      p_center: accountDetails.centerName,
      service: accountDetails.vehicleServiceDate,
    }).then(navigate("/login"));
  }
  return (
    <div className="mainDivCreateAcc">
      <div className="mainHeader">
        <img src="./Logo.svg" alt="logo" className="logoCreateAcc" />
        <div className="subHeader">
          <p class="marquee">
            <span>Please enter following details.</span>
          </p>
          <p class="marquee marquee2">
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please enter correct
              details
            </span>
          </p>
        </div>
      </div>
      <div className="mainBody mainCreateAcc">
        {list.map((details, idx) => {
          const {
            label,
            id,
            type,
            length,
            readonly = false,
            onlyText,
            noInput = false,
          } = details;
          return noInput ? (
            <div className="inpuDivText">{onlyText}</div>
          ) : (
            <div className="inputDiv">
              <input
                key={idx}
                id={id}
                type={type}
                name={id}
                maxlength={length}
                value={accountDetails[id]}
                onChange={(e) => onChangeValue(e.target.value, id)}
                onBlur={(e) => validateFields1(e.target.value, id, label)}
                readOnly={readonly}
              ></input>
              <label
                for={id}
                className={
                  !accountDetails[id] && type !== "date"
                    ? "labelAnimation"
                    : "labelAfter"
                }
              >
                {!accountDetails[id] && type !== "date"
                  ? `Enter ${label}`
                  : label}
              </label>
              {error[id] && <div className="errorText">{`*${error[id]}`}</div>}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "26px 0" }}>
        <button
          className="buttonStyle"
          style={{
            opacity:
              Object.keys(accountDetails).length === 11 &&
              Object.values(error).every((val) => val === "")
                ? "1"
                : "0.7",
          }}
          onClick={() =>
            Object.keys(accountDetails).length === 11 &&
            Object.values(error).every((val) => val === "") &&
            send1()
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
