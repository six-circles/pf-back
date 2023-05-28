const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const deleteUserById = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id);
    user.enable = false;
    user.save();
    res.status(201).send({ message: "User blocked" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteUserById;
