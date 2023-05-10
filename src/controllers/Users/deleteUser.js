const User = require("../../models/User");

const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    await User.findByIdAndRemove(userID);
    res.status(201).send({ message: "User deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteUser;
