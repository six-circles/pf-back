const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    const userProfile = await User.findById(user._id);

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getUserById;
