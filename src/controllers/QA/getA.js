const Answer = require("../../models/Answer");

const getAnswers = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.find({ question: id }).populate("question", {
      products: 0,
      __v: 0,
      _id: 0,
    });
    console.log(answer);

    res.status(200).json(answer);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
module.exports = getAnswers;
