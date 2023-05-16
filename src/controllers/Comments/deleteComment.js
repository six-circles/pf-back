const Comments = require("../../models/Comments");
const Product = require("../../models/Product");

const deleteComment = async (req, res) => {
  const { productID, commentID } = req.params;
  let suma = 0;
  try {
    await Comments.findByIdAndDelete(commentID);
    const product = await Product.findById(productID);

    const allComments = await Comments.find({ products: { _id: productID } });

    for (let i = 0; i < allComments.length; i++) {
      suma = allComments[i].punctuation + suma;
    }

    product.punctuations = suma / allComments.length;

    await product.save();

    res.status(201).send({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = deleteComment;
