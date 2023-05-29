const Questions = require("../../models/Questions");
const Product = require("../../models/Product");

const getQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    const questions = await Questions.find({ product: id })
      .populate("product", {
        comments: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        price: 0,
        stock: 0,
        description: 0,
        questions: 0,
      })
      .populate("user", {
        phone: 0,
        name: 1,
        password: 0,
        birthday: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate("answer", {
        question: 0,
        body: 1,
      });
    res.status(200).json(questions);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
module.exports = getQuestions;
