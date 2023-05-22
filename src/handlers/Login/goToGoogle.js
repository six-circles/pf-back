require("dotenv").config();
const axios = require("axios");
const goToGoogle = (req, res) => {
  // Redirige al usuario a la página de inicio de sesión de Google
  const scope = ["profile", "email"]; // Define los alcances que necesitas
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.GOOGLE_CLIENT_ID
  }&redirect_uri=${
    process.env.redirectUriGoogle
  }&response_type=code&scope=${scope.join("+")}`;
  res.redirect(authUrl);
};
module.exports = goToGoogle;
