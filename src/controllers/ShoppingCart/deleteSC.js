const User = require("../../models/User");

const deleteSC = async (req, res) => {
  const { productID, userID } = req.params;
  try {
    await User.findByIdAndUpdate(userID, {
      $pull: { shoppingCart: productID },
    });

    res.status(201).send({ message: "Product removed" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = deleteSC;
