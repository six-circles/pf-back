
const sendMail = require("../../Email/sendEmail");

const User = require("../../models/User");
const bcrypt = require("bcrypt");

const postUser = async (req, res) => {
  const { name, email, phone, password, birthday } = req.body;
  try {
    if (!name || !email || !phone || !password || !birthday)
      throw Error("Faltan datos");

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      password: hash,
      birthday: birthday,
    });

    await sendMail(newUser.email, "User created", "Welcome to SixCircle");

    res.status(201).send({ message: "User created", user: newUser });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = postUser;
