const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getFavorites = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId).populate("favorites", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
      stock: 1,
      condition: 1,
      enable: 1,
    });

    const favorites = user.favorites;

    let favoritesTrim = [];

    for (element of favorites) {
      if (!favoritesTrim.includes(element)) {
        favoritesTrim.push(element);
      }
    }

    res.status(200).json(favoritesTrim);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
module.exports = getFavorites;
