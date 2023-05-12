const User = require("../../models/User");
const bcrypt = require("bcrypt");

const checkLogin = async (req, response, next) => {
  try {
    const localStorage = [];
    const user = await User.findOne({ email: localStorage.email });

    if (user) {
      const match = await bcrypt.compare(localStorage.password, user.password);
      if (match) {
        localStorage.push(email);
        localStorage.push(password);
        console.log(localStorage);
        next();
      } else {
        response.status(404).send("You need to be logged in");
      }
    } else {
      response.status(404).send("You need to be logged in");
    }
  } catch (error) {
    response.status(500).json("You need to be logged in");
  }
};

module.exports = checkLogin;
