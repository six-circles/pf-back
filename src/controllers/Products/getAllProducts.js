const Product = require("../../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("comments", {
      products: 0,
      __v: 0,
      _id: 0,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getAllProducts;
