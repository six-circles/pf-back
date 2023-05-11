const Comments = require("../../models/Comments");

const getComments = async (req, res) => {
  try {
    const comments = await Comments.find().populate("products", {
      comments: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      price: 0,
      stock: 0,
      description: 0,
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getComments;
