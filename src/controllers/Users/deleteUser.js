const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const deleteUser = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);
    await User.findByIdAndRemove(user._id);
    res.status(201).send({ message: "User deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteUser;
