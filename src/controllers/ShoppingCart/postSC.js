const Product = require("../../models/Product");
const User = require("../../models/User");

const postSC = async (req, res) => {
  const { productsId, userId } = req.body;
  try {
    if (!productsId || !userId) {
      throw Error("Faltan datos");
    }
    const user = await User.findById(userId);
    const product = await Product.findById(productsId);

    user.shoppingCart = user.shoppingCart.concat(product._id);

    await user.save();

    res.status(201).json({ message: "Product added", content: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postSC;
