const Questions = require("../../models/Questions");
const Product = require("../../models/Product");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const postQuestions = async (req, res) => {
  const { body, productId, token } = req.body;
  try {
    if (!body || !productId || !token) throw Error("Faltan datos");
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);
    const product = await Product.findById(productId);

    const newQuestion = await Questions.create({
      product: product._id,
      body: body,
      user: user._id,
    });

    product.questions = product.questions.concat(newQuestion._id);

    await product.save();
    res
    .status(201)
      .json({ message: "Question created", question: newQuestion });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postQuestions;
