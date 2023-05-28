const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const postResetPassword = async (res, req) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ _id: id });
  const secret = secretKey + user.password;
  try {
    const payload = jwt.verify(token, secret);
    user.password = password;
  } catch (error) {}
};
module.exports = postResetPassword;
