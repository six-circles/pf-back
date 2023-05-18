const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { token } = req.params;
  const { name, email, phone, password, birthday } = req.body;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(user._id, {
        name: name,
        email: email,
        phone: phone,
        password: hash,
        birthday: birthday,
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        name: name,
        email: email,
        phone: phone,
        birthday: birthday,
      });
    }
    res.status(201).send({ message: "User updated" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = updateUser;
