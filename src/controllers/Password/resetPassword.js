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
    res.status(200).json({ user: user.name, email: payload.email });
  } catch (error) {
    res.status(404).json({ message: "Oops something went wrong" });
  }
};
module.exports = resetPassword;
