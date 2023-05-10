const User = require("../../models/User");

const updateUser = async (req, res) => {
  const { userID } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    await User.findByIdAndUpdate(userID, {
      name: name,
      email: email,
      phone: phone,
      password: password,
    });
    res.status(201).send({ message: "User updated" });
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = updateUser;
