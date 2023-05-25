const Product = require("../../models/Product");
const User = require("../../models/User");

const getProductsById = async (req, res) => {
  const { productID } = req.params;
  try {
    const products = await Product.find({ _id: productID })
      .populate("comments", {
        products: 0,
        __v: 0,
      })
      .populate("questions", {
        products: 0,
        __v: 0,
      })
      .populate("user", {
        phone: 0,
        password: 0,
        birthday: 0,
        createdAt: 0,
        updatedAt: 0,
      });
    for (let i = 0; i < products[0].comments.length; i++) {
      const idUser = products[0].comments[i].user.toString();
      const user = await User.find({ _id: idUser });
      const userComment = user[0].name;
      products[0].comments[i].userName = userComment;
    }
    for (let i = 0; i < products[0].questions.length; i++) {
      const idUser = products[0].questions[i].user.toString();
      const user = await User.find({ _id: idUser });
      const userComment = user[0].name;
      products[0].questions[i].userName = userComment;
    }

    let suma = 0;
    if (products[0].comments.length) {
      for (comment of products[0].comments) {
        suma += comment.punctuation;
      }
      products[0].punctuations = suma / products[0].comments.length;
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
module.exports = getProductsById;
