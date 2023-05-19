const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const deleteFavorites = async (req, res) => {
  const { productID, token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: productID },
    });

    res.status(201).send({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = deleteFavorites;
