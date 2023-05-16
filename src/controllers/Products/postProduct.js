const Product = require("../../models/Product");
const User = require("../../models/User");

const postProduct = async (req, res) => {
  const { title, image, description, stock, price, condition, userId } =
    req.body;
  try {
    if (
      !title ||
      !image ||
      !description ||
      !stock ||
      !price ||
      !condition ||
      !userId
    )
      throw Error("Faltan datos");

    const user = await User.findById(userId);
    const newProduct = await Product.create({
      title: title,
      image: image,
      description: description,
      stock: stock,
      price: price,
      condition: condition,
      user: user._id,
    });
    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postProduct;
