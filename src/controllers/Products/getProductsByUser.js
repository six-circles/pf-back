const Product = require("../../models/Product");

const getProductsByUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const products = await Product.find({ user: userID })
      .populate("comments", {
        products: 0,
        __v: 0,
        _id: 0,
      })
      .populate("user", {
        _id: 0,
        name: 1,
        email: 1,
      });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getProductsByUser;
