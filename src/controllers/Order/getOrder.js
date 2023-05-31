const Order = require("../../models/Order");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getOrder = async (req, res) => {
  const { token, orderId } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const order = await Order.findById(orderId)
      .populate("userComprador", {
        _id: 1,
        email: 1,
        name: 1,
      })
      .populate("userVendedor", {
        _id: 1,
        email: 1,
        name: 1,
      })
      .populate("shoppingCart", {
        title: 1,
        image: 1,
        punctuations: 1,
        price: 1,
        stock: 1,
        condition: 1,
        enable: 1,
      });
    const SC = order.shoppingCart;

    let contador = {};
    for (let i = 0; i < SC.length; i++) {
      let elemento = JSON.stringify(SC[i]);
      contador[elemento] = (contador[elemento] || 0) + 1;
    }

    const allShoppingCart = [];

    for (element of SC) {
      let elementoString = JSON.stringify(element);
      let elementoObjeto = JSON.parse(elementoString);
      elementoObjeto.cantidadCarrito = contador[elementoString];
      allShoppingCart.push(elementoObjeto);
    }

    const ShoppingCartToShow = [];

    for (const element of allShoppingCart) {
      let isDuplicate = ShoppingCartToShow.some(
        (item) => item._id === element._id
      );
      if (!isDuplicate) {
        ShoppingCartToShow.push(element);
      }
    }
    order.shoppingCart = ShoppingCartToShow;

    res.status(200).json({ order: order, shoppingCart: ShoppingCartToShow });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
module.exports = getOrder;
