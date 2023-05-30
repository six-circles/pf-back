const User = require("../../models/User");
const Order = require("../../models/Order");
const jwt = require("jsonwebtoken");
const Product = require("../../models/Product");

const postOrder = async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
      stock: 1,
      condition: 1,
      enable: 1,
    });

    const newOrder = await Order.create({
      shoppingCart: user.shoppingCart,
      user: user._id,
    });
    const productSC = user.shoppingCart;

    for (const element of productSC) {
      await Product.findOneAndUpdate(
        { _id: element._id },
        { $inc: { stock: -1 } }
      );
    }
    res
      .status(200)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = postOrder;
