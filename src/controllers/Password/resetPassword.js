const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const resetPassword = async (req, res) => {
  const { email, token } = req.params;
  const user = await User.findOne({ email: email });
  const secret = secretKey + user.password;
  try {
    const payload = jwt.verify(token, secret);
    console.log("payload", payload);
    res.status(200).json({ message: user.email });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = resetPassword;
