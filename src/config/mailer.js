const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL, PASS } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL, // generated ethereal user
    pass: PASS, // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

module.exports = transporter;
