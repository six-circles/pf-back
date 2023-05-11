const Comments = require("../../models/Comments");

const deleteComment = async (req, res) => {
  const { commentID } = req.params;
  try {
    await Comments.findByIdAndDelete(commentID);
    res.status(201).send({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = deleteComment;
