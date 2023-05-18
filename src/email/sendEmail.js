const transporter = require("../config/mailer");
require("dotenv").config();

const { EMAIL } = process.env;

const sendMail = async (userEmail, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `Six Circle <${EMAIL}>`, // sender address
      to: userEmail, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
