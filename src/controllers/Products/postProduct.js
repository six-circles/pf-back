const Product = require("../../models/Product");
const User = require("../../models/User");

const postProduct = async (req, res) => {
  const {
    title,
    image,
    description,
    stock,
    price,
    condition,
    userId,
    categories,
    moreCharacteristics,
  } = req.body;
  try {
    if (
      !title ||
      !image ||
      !description ||
      !stock ||
      !price ||
      !condition ||
      !userId ||
      !categories
    )
      throw Error("Faltan datos");

    if (
      categories !== "Technology" &&
      categories !== "Furniture" &&
      categories !== "Indumentary" &&
      categories !== "Others"
    ) {
      throw Error("Invalid Category");
    }

    const user = await User.findById(userId);
    const newProduct = await Product.create({
      title: title,
      image: image,
      description: description,
      stock: stock,
      price: price,
      condition: condition,
      user: user.token,
      categories: categories,
      moreCharacteristics: moreCharacteristics,
    });
    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postProduct;
