const User = require("../../models/User");

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.find({ email: email });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getUserByEmail;
