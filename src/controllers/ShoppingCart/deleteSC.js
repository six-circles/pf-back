const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const deleteSC = async (req, res) => {
  const { productID, token } = req.body;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    await User.findByIdAndUpdate(userId.userId, {
      $pull: { shoppingCart: productID },
    });

    res.status(201).send({ message: "Product removed" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = deleteSC;
