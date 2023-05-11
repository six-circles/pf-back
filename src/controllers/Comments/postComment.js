const Comments = require("../../models/Comments");
const Product = require("../../models/Product");

const postComment = async (req, res) => {
  const { body, punctuation, productsId } = req.body;
  try {
    if (!body || !punctuation || !productsId) {
      throw Error("Faltan datos");
    }

    const product = await Product.findById(productsId);

    const newComment = await Comments.create({
      body: body,
      punctuation: punctuation,
      products: product._id,
    });

    product.comments = product.comments.concat(newComment._id);
    await product.save();

    res.status(201).json({ message: "Comment created", user: newComment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postComment;
