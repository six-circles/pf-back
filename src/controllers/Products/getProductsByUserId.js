const Product = require("../../models/Product");
const User = require("../../models/User");

const getProductsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    const products = await Product.find({ user: user })
      .populate("comments", {
        products: 0,
        __v: 0,
      })
      .populate("user", {
        name: 1,
        email: 1,
      })
      .populate("questions", {
        products: 0,
        __v: 0,
        _id: 1,
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
module.exports = getProductsByUserId;
