const User = require("../../models/User");
const Product = require("../../models/Product");

const deleteUserById = async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  try {
    const user = await User.findById(id);
    const products = await Product.find({ user: user });
    if (user.enable === false) {
      user.enable = true;
      user.save();
      for (let element of products) {
        element.enable = true;
      }
      products.save();
      res.status(201).send({ message: "Unlocked user" });
    } else {
      user.enable = false;
      user.save();
      for (let element of products) {
        element.enable = false;
      }
      products.save();
      res.status(201).send({ message: "User blocked" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteUserById;
