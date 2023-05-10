const Product = require("../models/Product");

const postProduct = async (req, res) => {
  const { title, image, punctuations, description, stock, comments } = req.body;
  try {
    if (
      !title ||
      !image ||
      !punctuations ||
      !description ||
      !stock ||
      !comments
    )
      throw Error("Faltan datos");

    const newProduct = await Product.create({
      title: title,
      image: image,
      punctuations: punctuations,
      description: description,
      stock: stock,
      comments: comments,
    });
    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postProduct;
