const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const postSC = async (req, res) => {
  const { productsId, token } = req.body;
  console.log(req.body);
  try {
    if (!productsId || !token) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

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
