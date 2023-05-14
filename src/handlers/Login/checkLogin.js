const User = require("../../models/User");

const checkLogin = async (req, response, next) => {
  const { _id } = req.headers;
  console.log(req.headers);
  try {
    const user = await User.findOne({ _id: _id });
    if (user) {
      next();
    } else {
      response.status(404).send("You need to be logged in");
    }
  } catch (error) {
    response.status(500).json("You need to be logged in");
  }
};

module.exports = checkLogin;
