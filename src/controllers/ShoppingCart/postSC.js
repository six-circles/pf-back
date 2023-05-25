const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const postSC = async (req, res) => {
  const { productsId, token, cantidad } = req.body;
  try {
    if (!productsId || !token || !cantidad) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId);
    const product = await Product.findById(productsId);

    if (cantidad > 0) {
      for (let i = 0; i < cantidad; i++) {
        user.shoppingCart = user.shoppingCart.concat(product._id);
      }
    } else {
      const user = await User.findById(userId.userId).populate("shoppingCart", {
        title: 1,
      });
      const productIndex = user.shoppingCart.findIndex(
        (product) => product._id.toString() === productsId
      );

      if (productIndex !== -1) {
        const product = user.shoppingCart[productIndex];

        if (cantidad < product.quantity) {
          product.quantity -= cantidad;
        } else {
          user.shoppingCart.splice(productIndex, 1);
        }

        await user.save();
      }
    }
    await user.save();
    res
      .status(201)
      .json({ message: `${cantidad} products added`, content: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
module.exports = postSC;
