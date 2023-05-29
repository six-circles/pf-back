const User = require("../../models/User");
const sendMail = require("../../email/sendEmail");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const secret = secretKey + user.password;
    const payload = {
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:3001/reset-password/${user.email}/${token}`;

    await sendMail(
      user.email,
      "Forgot Password",
      null,
      `<b>Please, click on the following link, or paste this into your browser to complete the process: </b>
      <a href="${link}">${link}`
    );
    res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = forgotPassword;
