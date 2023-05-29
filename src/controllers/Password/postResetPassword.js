const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const postResetPassword = async (req, res) => {
  const { email, token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ email: email });
  const secret = secretKey + user.password;
  try {
    const payload = jwt.verify(token, secret);
    console.log(payload);
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    user.save();
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = postResetPassword;
