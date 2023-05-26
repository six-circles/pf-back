const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const checkLogin = async (req, response, next) => {
  const { token } = req.headers;
  console.log({ token: token });
  try {
    if (!token) {
      return response
        .status(401)
        .json({ error: "You need to be logged in", message: "Missing token" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
    console.log({ decodedToken: decodedToken });

    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      console.log("error 1");
      return response.status(404).send("User not found");
    }
    console.log("ok");
    next();
  } catch (error) {
    console.log("error 2");
    response.status(500).json({ error: "You need to be logged in" });
  }
};

module.exports = checkLogin;
