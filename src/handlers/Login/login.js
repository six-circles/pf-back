const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const login = async (req, response, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ userId: user._id }, secretKey);
        console.log(token);
        response.status(202).json({
          token: token,
          user: user.name,
        });
      } else {
        response.status(401).send("Passwords do not match");
      }
    } else {
      response.status(404).send("User not found");
    }
  } catch (error) {
    response.status(500).json("Error during login");
  }
};

module.exports = login;
