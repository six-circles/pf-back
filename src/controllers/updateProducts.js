const Product = require("../models/Product");

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { description, stock } = req.body;

  try {
    if (!description && !stock) {
      throw Error("Faltan datos");
    }
    const putProducts = await Product.findByIdAndUpdate(id, {
      description: description,
      stock: stock,
    });
    console.log(putProducts);
    res.status(200).json("Producto modificado");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = updateProducts;
