const User = require("../../models/User");

const getSC = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
    });

    const SC = user.shoppingCart;
    res.status(200).json(SC);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getSC;
