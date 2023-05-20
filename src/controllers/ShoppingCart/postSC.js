const Product = require("../../models/Product");
const User = require("../../models/User");
// const ShoppingCart = require("../../models/ShoppingCart");
const jwt = require("jsonwebtoken");

const postSC = async (req, res) => {
<<<<<<< HEAD
  const { productsId, token } = req.body;
  console.log(req.body);
=======
  const { productsId, token, cantidad } = req.body;
>>>>>>> c8f3b1e7f1f65e230b257572ab89d6dc7de0a9ba
  try {
    if (!productsId || !token || !cantidad) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId);
    const product = await Product.findById(productsId);

    for (let i = 0; i < cantidad; i++) {
      user.shoppingCart = user.shoppingCart.concat(product._id);
    }
    await user.save();

    res
      .status(201)
      .json({ message: `${cantidad} products added`, content: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
module.exports = postSC;
