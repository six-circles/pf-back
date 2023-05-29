const Product = require("../../models/Product");

const deleteSC = async (req, res) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      throw Error("Faltan datos");
    }
    await Product.findByIdAndDelete(productId);
    res.status(201).send({ message: "Product deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = deleteSC;
