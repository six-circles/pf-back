const ProductCloudinary = require("../../models/ProductCloudinary");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../config/cloudinary");

const pruebacloudinary = async (req, res) => {
  const {
    title,
    description,
    stock,
    price,
    condition,
    token,
    category,
    moreCharacteristics,
  } = req.body;
  console.log(req.body);
  console.log(req.file);
  try {
    if (
      !title ||
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

    const newProduct = await ProductCloudinary.create({
      title: title,
      description: description,
      stock: stock,
      price: price,
      condition: condition,
      user: user._id,
      category: category,
      moreCharacteristics: moreCharacteristics,
    });

    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const objImg = { cloudinaryID: result.public_id, url: result.secure_url };
      newProduct.image.push(objImg);
      newProduct.save();
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: "cloudinary created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
module.exports = pruebacloudinary;
