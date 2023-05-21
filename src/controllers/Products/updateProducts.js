const Product = require("../../models/Product");

const updateProducts = async (req, res) => {
  const { productID } = req.params;
  const { description, stock, price, enable, title } = req.body;

  try {
    const putProducts = await Product.findByIdAndUpdate(productID, {
      price: price,
      description: description,
      stock: stock,
      enable: enable,
      title: title,
    });
    res.status(200).json("Producto modificado");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = updateProducts;
