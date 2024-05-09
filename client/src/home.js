import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [Aadhar_Licence, setAadhar_Licence] = useState([]);
  const [month, setMonth1] = useState([]);
  const username = Cookies.get("Username");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/Home").then((response) => {
      setData(response.data[0]);
    });
    axios.get("http://localhost:3001/api/Date").then((response) => {
      setMonth1(response.data);
    });
    axios.get("http://localhost:3001/api/Home2").then((response) => {
      setAadhar_Licence(response.data[0]);
    });
  }, []);

  const list1 = [
    {
      label: "PUC Renewal :",
      value: `In ${month[month.length - 3]} Months `,
    },
    {
      label: "Next Vehicle Servicing :",
      value: "In " + month[month.length - 2] + " Months ",
    },
    {
      label: "Vehical is Valid until  :",
      value: month[month.length - 1],
      empty: "",
      update: "/update",
    },
  ];
  const list2 = [
    { label: "Vehicle Owner :", value: data.Name },

    { label: "Vehicle Model :", value: data.V_model_name },
    { label: "Vehicle Registration Number :", value: data.V_registration_no },
    { label: "Aadhar Number :", value: Aadhar_Licence.Adhar },
    { label: "Driver's License Number :", value: Aadhar_Licence.License },
  ];

  return (
    <div className="home" style={{ height: "92%" }}>
      <div className="mainHeader">
        <div className="imgDiv">
          <img src="./Logo.svg" alt="logo" className="logoCreateAcc" />
          <img
            src="./notification.jpeg"
            alt="notification"
            className="notification"
          />
        </div>
        <div
          className="subHeader"
          style={{ padding: "14px 0px", fontSize: "20px" }}
        >
          Updates Related To Your Vehicle
        </div>
      </div>
      <div className="subBody">
        {list1.map((listItem, idx) => {
          const { label, value, empty, update } = listItem;
          return (
            <span key={idx} style={{ paddingInline: "50px" }}>
              {`${label} ${value}`}
              <div className="hello">
                <a>{<br />}</a>
              </div>
              {update && (
                <div className="Update">
                  <a onClick={() => navigate(update)}>UPDATE</a>
                </div>
              )}
            </span>
          );
        })}
      </div>
      <div className="finalList">
        {list2.map((details, idy) => {
          const { label, value } = details;
          return <span key={idy}>{`${label} ${value}`}</span>;
        })}
      </div>
    </div>
  );
};

export default Home;
