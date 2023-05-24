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
  } = Json.parse(req.body.data);
  console.log(req.body);
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
      let arrayImage = [];
      if (req.files.image1) {
        arrayImage.push(req.files.image1[0]);
      }
      if (req.files.image2) {
        arrayImage.push(req.files.image2[0]);
      }
      if (req.files.image3) {
        arrayImage.push(req.files.image3[0]);
      }
      console.log("arrayimage", arrayImage);

      for (let image of arrayImage) {
        const result = await cloudinary.uploader.upload(image.path);
        let objImg = {
          cloudinaryID: result.public_id,
          url: result.secure_url,
        };
        newProduct.image.push(objImg);
        newProduct.save();
      }
      console.log(newProduct);
    } catch (error) {
      console.log(error);
    }

    res.status(201).json({ message: "cloudinary created", user: newProduct });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = pruebacloudinary;
