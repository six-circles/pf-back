const Answer = require("../../models/Answer");
const Questions = require("../../models/Questions");

const postAnswers = async (req, res) => {
  const { body, questionId } = req.body;
  try {
    if (!body || !questionId) throw Error("Faltan datos");
    const question = await Questions.findById(questionId);

    question.answer = body;

    res.status(201).json({ message: "Answer created", question: question });
    await question.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postAnswers;
