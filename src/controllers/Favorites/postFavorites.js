const Product = require("../../models/Product");
const User = require("../../models/User");
const Favorites = require("../../models/Favorites");
const jwt = require("jsonwebtoken");

const postFavorites = async (req, res) => {
  const { productsId, token } = req.body;
  try {
    if (!productsId || !token) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId);
    const product = await Product.findById(productsId);

    const newFavorite = await Favorites.create({
      user: user._id,
      product: product._id,
    });

    user.favorites.push(newFavorite._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Product added to favorites", content: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = postFavorites;
