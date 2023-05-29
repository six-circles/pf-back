const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const eraseSC = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId);

    user.shoppingCart = [];
    user.save();
    res.status(201).send({ message: "ShoppingCart deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};
module.exports = eraseSC;
