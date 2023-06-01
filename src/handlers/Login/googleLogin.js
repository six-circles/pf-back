require("dotenv").config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { URL_FRONT } = process.env;

const googleLogin = async (req, res) => {
  const code = req.query.code;

  const tokenUrl = "https://oauth2.googleapis.com/token";
  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.redirectUriGoogle,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(tokenUrl, data);
    const accessToken = response.data.access_token;

    const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
    const userResponse = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = userResponse.data;

    const user = await User.findOne({ email: userData.email });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY_JWT);
      res.redirect(307, `${URL_FRONT}?token=${token}&user=${user.name}`);
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
      res.redirect(307, `${URL_FRONT}?token=${token}&user=${newUser.name}`);
    }
  } catch (error) {
    res.status(500).send("Error en la autenticación con Google");
  }
};
module.exports = googleLogin;
