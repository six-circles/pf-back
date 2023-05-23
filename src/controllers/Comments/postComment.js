const Comments = require("../../models/Comments");
const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const postComment = async (req, res) => {
  const { body, punctuation, productsId, token } = req.body;
  let suma = 0;
  try {
    if (!body || !punctuation || !productsId || !token) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    const product = await Product.findById(productsId);
    const comments = await Comments.find({
      products: {
        _id: productsId,
      },
    });

    for (element of comments) {
      if (JSON.stringify(element.user) === JSON.stringify(user._id)) {
        throw Error("Your comment already exists");
      }
    }
    const newComment = await Comments.create({
      body: body,
      punctuation: punctuation,
      products: product._id,
      user: user._id,
    });

    product.comments = product.comments.concat(newComment._id);

    for (let i = 0; i < comments.length; i++) {
      suma = comments[i].punctuation + suma;
    }

    product.punctuations = suma / comments.length;

    await product.save();

    res.status(201).json({ message: "Comment created", user: newComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postComment;
