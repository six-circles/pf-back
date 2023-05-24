const Product = require("../../models/Product");
const User = require("../../models/User");
const ShoppingCart = require("../../models/ShoppingCart");
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
        const newCartItem = await ShoppingCart.create({
          user: user._id,
          product: product._id,
        });

        user.shoppingCart.push(newCartItem._id);
      }
    } else {
      const userWithShoppingCart = await User.findById(userId.userId).populate(
        "shoppingCart"
      );
      const shoppingCartIndex = userWithShoppingCart.shoppingCart.findIndex(
        (cartItem) => cartItem.product.toString() === productsId
      );

      if (shoppingCartIndex !== -1) {
        const cartItem = userWithShoppingCart.shoppingCart[shoppingCartIndex];

        if (Math.abs(cantidad) < cartItem.quantity) {
          cartItem.quantity += cantidad;
        } else {
          userWithShoppingCart.shoppingCart.splice(shoppingCartIndex, 1);
        }

        await cartItem.save();
      }
    }

    await user.save();

    res
      .status(201)
      .json({ message: `${Math.abs(cantidad)} products added`, content: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = postSC;
