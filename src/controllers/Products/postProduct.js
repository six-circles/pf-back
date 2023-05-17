const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const postProduct = async (req, res) => {
  const {
    title,
    image,
    description,
    stock,
    price,
    condition,
    token,
    category,
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
      !token ||
      !category
    )
      throw Error("Faltan datos");

    if (
      category !== "Technology" &&
      category !== "Furniture" &&
      category !== "Indumentary" &&
      category !== "Others"
    ) {
      throw Error("Invalid Category");
    }

    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);

    const user = await User.findById(userId.userId);

    const newProduct = await Product.create({
      title: title,
      image: image,
      description: description,
      stock: stock,
      price: price,
      condition: condition,
<<<<<<< HEAD
      user: user.token,
      categories: categories,
=======
      user: user._id,
      category: category,
>>>>>>> f308f42ff5902e46c1b82d3238b1c4e62cb885c2
      moreCharacteristics: moreCharacteristics,
    });
    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postProduct;
