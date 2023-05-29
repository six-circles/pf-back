const Order = require("../../models/Order");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getOrdersById = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const order = await Order.find({ user: userId.userId }).populate(
      "shoppingCart",
      {
        title: 1,
        image: 1,
        punctuations: 1,
        price: 1,
        stock: 1,
        condition: 1,
        enable: 1,
      }
    );

    res.status(200).json({ order: order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = getOrdersById;
