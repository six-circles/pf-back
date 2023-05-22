const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../config/cloudinary");

const pruebacloudinary = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const newProduct = {};

    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const objImg = { id: result.public_id, url: result.secure_url };
      newProduct.image = objImg;
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: "Product created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = pruebacloudinary;
