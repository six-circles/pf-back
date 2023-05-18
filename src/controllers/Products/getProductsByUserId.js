const Product = require("../../models/Product");
const User = require("../../models/User");

const getProductsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    const products = await Product.find({ user: user })
      .populate("comments", {
        products: 0,
        __v: 0,
        _id: 0,
      })
      .populate("user", {
        _id: 0,
        name: 1,
        email: 1,
      })
      .populate("questions", {
        products: 0,
        __v: 0,
        _id: 0,
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getProductsByUserId;
