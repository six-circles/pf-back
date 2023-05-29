const Order = require("../../models/Order");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getOrder = async (req, res) => {
  const { token, orderId } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
      stock: 1,
      condition: 1,
    });

    const order = await Order.findById(orderId).populate("user", {
      _id: 1,
      email: 1,
      name: 1,
    });

    order.shoppingCart = user.shoppingCart;

    res.status(200).json({ order: order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = getOrder;
