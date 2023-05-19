const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const checkLogin = async (req, response, next) => {
  const { token } = req.headers;
  console.log("1:", token);
  if (!token) {
    return response
      .status(401)
      .json({ error: "You need to be logged in", message: "Missing token" });
  }
  try {
    if (!token) {
      return response
        .status(401)
        .json({ error: "You need to be logged in", message: "Missing token" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return response.status(404).send("User not found");
    }
    next();
  } catch (error) {
    response.status(500).json({ error: "You need to be logged in" });
  }
};

module.exports = checkLogin;
