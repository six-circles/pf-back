const Questions = require("../../models/Questions");

const deleteAnswers = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Questions.findById(questionId);

    question.answer = "";

    question.save();

    res.status(201).send({ message: "Answer deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteAnswers;
