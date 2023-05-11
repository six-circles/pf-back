const Product = require("../../models/Product");

const postProduct = async (req, res) => {
  const { title, image, description, stock, price } = req.body;
  try {
    if (!title || !image || !description || !stock || !price)
      throw Error("Faltan datos");

    const newProduct = await Product.create({
      title: title,
      price: price,
      image: image,
      description: description,
      stock: stock,
    });
    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postProduct;
