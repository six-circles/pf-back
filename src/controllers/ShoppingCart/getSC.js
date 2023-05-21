const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getSC = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
    });

    const SC = user.shoppingCart;
    res.status(200).json(SC);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getSC;
