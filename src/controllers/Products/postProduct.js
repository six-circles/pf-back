const { uploadImage } = require("../../config/cloudinary");
const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs-extra");

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
      description: description,
      stock: stock,
      price: price,
      condition: condition,
      user: user._id,
      category: category,
      moreCharacteristics: moreCharacteristics,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFile.Path);
      newProduct.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      console.log(result);
      await fs.unlink(req.files.image.tempFile.Path);
    }

    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postProduct;
