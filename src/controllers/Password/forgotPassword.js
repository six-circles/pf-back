const User = require("../../models/User");
const sendMail = require("../../email/sendEmail");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY_JWT;

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    const secret = secretKey + user.password;
    const payload = {
      email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const token64 = new Buffer.from(token).toString("base64");
    const email64 = new Buffer.from(user.email).toString("base64");
    const link = `${process.env.URL_FRONT}/reset-password/${email64}/${token64}`;

    await sendMail(
      user.email,
      "Forgot Password",
      null,
      `<p>Buen dia, ${user.name}, para restablecer tu contraseña, por favor haz click sobre el siguiente enlace: <a href="${link}">Cambiar contraseña</a></p>`
    );
    res.status(200).json({
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = forgotPassword;
