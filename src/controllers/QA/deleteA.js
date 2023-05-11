const Answer = require("../../models/Answer");

const deleteAnswers = async (req, res) => {
  const { id } = req.params;
  try {
    await Answer.findByIdAndRemove(id);
    res.status(201).send({ message: "Answer deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteAnswers;
