const Product = require("../../models/Product");

const getProductsById = async (req, res) => {
  const { productID } = req.params;
  try {
    const products = await Product.find({ _id: productID })
      .populate("comments", {
        products: 0,
        __v: 0,
        _id: 0,
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
module.exports = getProductsById;
