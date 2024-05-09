const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const { json } = require("body-parser");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
//const cookie = require("cookie");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "zeaa",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mithra86753@gmail.com",
    pass: "vvpkjplimesoyxlo",
  },
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Login
const a = Array();
const data = {};
const RemainingMonths = [];
app.post("/api/login", (req, res) => {
  const userName = req.body.Username;
  a.push(userName);
  const password = req.body.Password;

  //console.log(userName, password);
  const sql = "SELECT * FROM userloginfo WHERE Username= ? and PASSWORD=?";
  db.query(sql, [userName, password], (error, results) => {
    if (results.length === 0) {
      console.log("wrong username or password");
      res.status(200).json({ success: false, data: null });
    }
    if (results.length === 1) {
      console.log("login Successful");
      res.status(200).json({ success: true, data: results[0] });
    }
    console.log(results.length);
    res.send(results.data);
  });
});

//SignUp

app.post("/api/signUp", (req, res) => {
  const userName = req.body.Username;
  const email = req.body.Email;
  const password = req.body.Password;

  const sql =
    "INSERT INTO userloginfo(`Username`, `Email`, `Password`) VALUES (?,?,?)";

  db.query(sql, [userName, email, password], (error, results) => {
    console.log("SignUp successful");
  });
});

app.post("/api/email", (req, res) => {
  const email = req.body.Email;
  console.log(email);
  const mailOptions = {
    from: "mithra86753@gmail.com",
    to: email,
    subject: "Nodemailer Test",
    html: "hiii",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});
// create account

app.post("/api/create", (req, res) => {
  const name = req.body.Name;
  const adhar = req.body.Adhar;
  const license = req.body.License;
  const username = req.body.userName;
  const sql =
    "INSERT INTO `userinfo`(`Username`, `Name`, `Adhar`, `License`) VALUES (?,?,?,?)";

  db.query(sql, [username, name, adhar, license], (error, results) => {});
});

app.post("/api/create1", (req, res) => {
  const username = req.body.username;
  const Name = req.body.Name;
  const model = req.body.model;
  const registration = req.body.registration;
  const v_purchase = req.body.v_purchase;
  const v_company = req.body.v_company;
  const p_purchase = req.body.p_purchase;
  const p_center = req.body.p_center;
  const service = req.body.service;

  const sql =
    "INSERT INTO `vehicle_info`(`Username`, `Name`, `V_model_name`, `V_registration_no`, `V_Purchasing_date`, `V_company_name`, `P_purchasing_date`, `P_center_name`, `V_service_date`) VALUES (?,?,?,?,?,?,?,?,?)";

  db.query(
    sql,
    [
      username,
      Name,
      model,
      registration,
      v_purchase,
      v_company,
      p_purchase,
      p_center,
      service,
    ],
    (error, results) => {
      console.log("done");
    }
  );
});

//update

app.get("/api/update", (req, res) => {
  let username = a[a.length - 1];

  console.log(username1);
  const sql = "SELECT * FROM vehicle_info WHERE Username =?";
  db.query(sql, [username], (err, results) => {
    console.log(typeof results);
    Object.assign(data, results[0]);

    res.send(results);
    console.log(a.length);
  });
});

//update1

app.post("/api/Update1", (req, res) => {
  let username = a[a.length - 1];
  const v_purchase = req.body.v_purchase;

  const p_purchase = req.body.p_purchase;

  const service = req.body.service;

  const sql =
    "UPDATE `vehicle_info` SET `V_Purchasing_date`=?,`P_purchasing_date`=?,`V_service_date`=? WHERE `Username`=?";

  db.query(
    sql,
    [v_purchase, p_purchase, service, username],
    (error, results) => {
      console.log("done");
    }
  );
});

// home

app.get("/api/Home", (req, res) => {
  let username = a[a.length - 1];

  // console.log(username1);
  const sql = "SELECT * FROM vehicle_info WHERE Username =?";
  db.query(sql, [username], (err, results) => {
    console.log(typeof results);
    Object.assign(data, results[0]);

    res.send(results);
    console.log(a.length);
  });
});
//date
app.get("/api/Date", (req, res) => {
  let dateStr = Array();
  dateStr.push(data.P_purchasing_date);
  dateStr.push(data.V_service_date);
  let age = data.V_Purchasing_date;
  let year = age.substring(0, 4);
  let V_year = parseInt(year) + 15;
  for (let i = 0; i <= 1; i++) {
    console.log(dateStr[i]);
    let monthstr = dateStr[i].substring(5, 7);

    console.log(monthstr);
    let monthInt = parseInt(monthstr);

    let today = new Date();
    let date = new Date();
    date.setFullYear(today.getFullYear(), monthInt - 1, 1);
    date.setMonth(date.getMonth() + 6);

    let remainingMonths =
      (date.getFullYear() - today.getFullYear()) * 12 +
      date.getMonth() -
      today.getMonth();
    console.log(remainingMonths);
    RemainingMonths.push(remainingMonths);
  }
  RemainingMonths.push(V_year);
  res.send(RemainingMonths);
});

app.get("/api/Home2", (req, res) => {
  let username = a[a.length - 1];

  // console.log(username1);
  const sql = "SELECT * FROM userinfo WHERE Username =?";
  db.query(sql, [username], (err, results) => {
    console.log(typeof results);
    Object.assign(data, results[0]);

    res.send(results);
    console.log(a.length);
    console.log(results);
  });
});

app.listen(3001, () => {
  console.log("kaam kar ree");
});
