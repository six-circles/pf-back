const Questions = require("../../models/Questions");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getQuestionsByUser = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    const questions = await Questions.find()
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
        password: 0,
        birthday: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate("answer", {
        question: 0,
      });

    const questionsByUser = await Questions.find({
      user: {
        _id: user._id,
      },
    }).populate("product", {
      comments: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      price: 0,
      stock: 0,
      description: 0,
      questions: 0,
      punctuations: 0,
      condition: 0,
      user: 0,
      category: 0,
      enable: 0,
      image: 0,
    });
    res.status(200).json(questionsByUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
module.exports = getQuestionsByUser;
