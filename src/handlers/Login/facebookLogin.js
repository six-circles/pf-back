require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const facebookLogin = async (req, res) => {
  const code = req.query.code;

  const redirectUri =
    "pf-back-sixcirlces-production.up.railway.app/auth/facebook/callback";
  const tokenUrl = `https://graph.facebook.com/v14.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${redirectUri}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`;

  try {
    const response = await axios.get(tokenUrl);
    const accessToken = response.data.access_token;

    const userInfoUrl = `https://graph.facebook.com/v14.0/me?fields=id,email,name&access_token=${accessToken}`;
    const userResponse = await axios.get(userInfoUrl);
    const userData = userResponse.data;

    const user = await User.findOne({ email: userData.email });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY_JWT);
      res.status(202).json({
        token: token,
        user: user.name,
      });
    } else {
      const newUser = await User.create({
        name: userData.name,
        email: userData.email,
      });

      const newUserFind = await User.findOne({ email: newUser.email });
      const token = jwt.sign(
        { userId: newUserFind._id },
        process.env.SECRET_KEY_JWT
      );
      res.status(202).json({
        token: token,
        user: newUserFind.name,
      });
    }
  } catch (error) {
    res.status(500).send("Error en la autenticación con Facebook");
  }
};
module.exports = facebookLogin;
