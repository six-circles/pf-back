const Delivery = require("../../models/Delivery");
const User = require("../../models/User");
const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");

const postDelivery = async (req, res) => {
  const { token, productsId, type, status } = req.body;
  try {
    if (!type || !status) {
      throw Error("Faltan datos");
    }

    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId);

    let products = [];
    for (eachProductId of productsId) {
      let eachProduct = await Product.findById(eachProductId);
      products.push(eachProduct);
    }
    let seller = [];
    for (element of products) {
      if (!seller.includes(element.user.userId)) {
        seller.push({ user: element.user, productId: element._id });
      }
    }
    let moreThanOneDelivery = [];
    if (seller.length === 1) {
      var newDelivery = await Delivery.create({
        type: type,
        status: status,
        products: products,
        buyer: userId.userId,
        seller: seller,
      });
      moreThanOneDelivery.push(newDelivery);
    } else {
      for (element of seller) {
        var newDelivery = await Delivery.create({
          type: type,
          status: status,
          products: products,
          buyer: userId.userId,
          seller: seller,
        });
        moreThanOneDelivery.push(newDelivery);
      }
    }
    res
      .status(201)
      .send({ message: "Delivery created", delivery: moreThanOneDelivery });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
};
module.exports = postDelivery;
