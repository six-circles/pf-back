const mercadopago = require("mercadopago");
require("dotenv").config();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MERCADOPAGO,
});

const handlerMercadoPago = async (req, res) => {
  const { shoppingCart } = req.body;
  const { token } = req.params;
  const URL = "http://localhost:5173/";
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId);

    const items = shoppingCart.map((item) => ({
      title: item.title,
      quantity: item.cantidadCarrito,
      currency_id: "ARS",
      unit_price: item.price,
    }));

    const preference = {
      items: items,
      payer: {
        name: user.name,
        email: user.email,
        phone: {
          area_code: "11",
          number: user.phone,
        },
        address: { address1: user.address },
      },
      // payment_methods: {
      //   excluded_payment_types: [{ id: "atm" }], // Excluye el método de pago "atm"
      // },
      back_urls: {
        success: `${URL}success`,
        failure: `${URL}failure`,
        pending: `${URL}pending`,
      },
      auto_return: "approved",
      notification_url: `${URL}notification`,
      transaction_amount: 58.8,
    };

    mercadopago.preferences.create(preference);
    try {
      const response = await mercadopago.preferences.create(preference);
      console.log(response.body.sandbox_init_point);
      res.redirect(307, response.body.sandbox_init_point);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error al crear la preferencia de pago" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = handlerMercadoPago;
