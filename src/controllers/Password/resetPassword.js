const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (id !== user.id) {
    res.send("Invalid id..");
    return;
  }
  const secret = secretKey + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.status(200).json({ message: user.email });
  } catch (error) {}
};
module.exports = resetPassword;
