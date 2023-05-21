const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getSC = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
    });

    const SC = user.shoppingCart;

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

    res.status(200).json(ShoppingCartToShow);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};
module.exports = getSC;
