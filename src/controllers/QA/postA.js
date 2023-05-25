const Answer = require("../../models/Answer");
const Questions = require("../../models/Questions");

const postAnswers = async (req, res) => {
  const { body, questionId } = req.body;
  try {
    if (!body || !questionId) throw Error("Faltan datos");
    const question = await Questions.findById(questionId);

    const newAnswers = await Answer.create({
      question: question._id,
      body: body,
    });

    question.answer = question.answer.concat(newAnswers._id);

    res.status(201).json({ message: "Answer created", answer: newAnswers });
    await question.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postAnswers;
