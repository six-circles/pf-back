const Comments = require("../../models/Comments");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getCommentsByUser = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    const comments = await Comments.find()
      .populate("products", {
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
        _id: 1,
        name: 1,
        email: 1,
      });

    const commentsByUser = await Comments.find({
      user: {
        _id: user._id,
      },
    });
    res.status(200).json(commentsByUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getCommentsByUser;
