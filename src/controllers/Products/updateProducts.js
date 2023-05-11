const Product = require("../../models/Product");

const updateProducts = async (req, res) => {
  const { productID } = req.params;
  const { description, stock, price, punctuations } = req.body;

  try {
    if (!description || !stock || !price || !punctuations) {
      throw Error("Faltan datos");
    }
    const putProducts = await Product.findByIdAndUpdate(productID, {
      price: price,
      description: description,
      stock: stock,
      punctuations: punctuations,
    });
    res.status(200).json("Producto modificado");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = updateProducts;
