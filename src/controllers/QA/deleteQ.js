const Questions = require("../../models/Questions");

const deleteQuestions = async (req, res) => {
  const { id } = req.params;
  try {
    await Questions.findByIdAndRemove(id);
    res.status(201).send({ message: "Questions deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteQuestions;
