const User = require("../../models/User");
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
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `http://localhost:3001/reset-password/${user.id}/${token}`;
    res.status(200).json({
      status: "Password reset link has been sent to your email",
      message: link,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = forgotPassword;
