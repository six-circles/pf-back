const Questions = require("../../models/Questions");
const Product = require("../../models/Product");

const postQuestions = async (req, res) => {
  const { body, productId, userId } = req.body;
  try {
    if (!body || !productId || !userId) throw Error("Faltan datos");
    const product = await Product.findById(productId);

    const newQuestion = await Questions.create({
      product: product._id,
      body: body,
      user: userId,
    });

    product.questions = product.questions.concat(newQuestion._id);

    res
      .status(201)
      .json({ message: "Question created", question: newQuestion });
    await product.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postQuestions;
