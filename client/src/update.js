import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const username = Cookies.get("Username");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [accountDetails, setAccountDetails] = useState({ userName: username });
  const [error, setError] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/update").then((response) => {
      setData(response.data[0]);
    });
  }, []);
  const list = [
    {
      label: "Your Username",
      type: "text",
      length: "20",
      id: "userName",
      readonly: true,
    },

    { onlyText: "Update your vehicle details :", noInput: true },

    {
      label: "Vehicle Purchasing Date",
      type: "date",
      length: "20",
      id: "vehiclePurchaseDate",
    },

    {
      label: "PUC Purchasing Date ",
      type: "date",
      length: "8",
      id: "purchaseDate",
    },

    {
      label: "Vehicle Latest Servicing Date ",
      type: "date",
      length: "20",
      id: "vehicleServiceDate",
    },
  ];
  const onChangeValue = (value, id) => {
    setAccountDetails({ ...accountDetails, [id]: value });
    setError({ ...error, [id]: "" });
  };
  function validateFields1(value, id, label, type) {}
  function onsubmit() {
    /* if (object(accountDetails.length) && !error) {
      console.log("proceed");
    }*/
  }
  function send() {
    console.log("connect to db user info");

    return axios
      .post("http://localhost:3001/api/Update1", {
        v_purchase: accountDetails.vehiclePurchaseDate,
        p_purchase: accountDetails.purchaseDate,

        service: accountDetails.vehicleServiceDate,
      })
      .then();
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
        <button className="buttonStyle" onClick={send()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
