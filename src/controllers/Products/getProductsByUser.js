const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getProductsByUser = async (req, res) => {
  const { token } = req.params;

  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    const products = await Product.find({ user: user })
      .populate("comments", {
        products: 0,
        __v: 0,
        _id: 0,
      })
      .populate("user", {
        _id: 0,
        name: 1,
        email: 1,
      })
      .populate("questions", {
        products: 0,
        __v: 0,
        _id: 0,
      });

    for (element of products) {
      let suma = 0;
      if (element.comments.length) {
        for (comment of element.comments) {
          suma += comment.punctuation;
        }
        element.punctuations = suma / element.comments.length;
      }
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getProductsByUser;
