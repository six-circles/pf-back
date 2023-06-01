const User = require("../../models/User");
const Order = require("../../models/Order");
const jwt = require("jsonwebtoken");
const Product = require("../../models/Product");
const sendMail = require("../../email/sendEmail");

const postOrder = async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      throw Error("Faltan datos");
    }
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const user = await User.findById(userId.userId).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
      stock: 1,
      condition: 1,
      enable: 1,
      user: 1,
    });
    const seller = user.shoppingCart;
    const idSellers = [];
    for (element of seller) {
      if (!idSellers.includes(element.user)) {
        idSellers.push(element.user);
      }
    }
    console.log(idSellers);
    const newOrder = await Order.create({
      shoppingCart: user.shoppingCart,
      userComprador: user._id,
      userVendedor: idSellers,
    });
    const productSC = user.shoppingCart;

    for (const element of productSC) {
      await Product.findOneAndUpdate(
        { _id: element._id },
        {
          $inc: { stock: -1 },
          $set: { enable: element.stock === 0 ? true : false },
        }
      );
    }
    const userSellers = [];

    for (const element of idSellers) {
      let user = await User.findById(element);
      userSellers.push(user);
    }

    const listProducts = [];
    for (const prodVendido of newOrder.shoppingCart) {
      let vendedorProducto = "";
      let user = await User.findById(prodVendido.user);
      vendedorProducto = `${prodVendido.title} (${user.email})`;
      listProducts.push(vendedorProducto);
    }
    const listaProductos = listProducts.join(", ");

    await sendMail(
      user.email,
      "Compra Exitosa!",
      null,
      `<p>Buen dia, ${user.name}, gracias por realizar la compra de: ${listaProductos}. Por favor, comunicate con el/los usuario/s para coordinar la entrega.
      </p>`
    );

    for (const userSell of userSellers) {
      for (const prodVendido of newOrder.shoppingCart) {
        if (prodVendido.user === userSell._id) {
          await sendMail(
            userSell.email,
            "Venta exitosa!",
            null,
            `<p>Buen dia, ${userSell.name}, realizaste una venta del producto : ${prodVendido.title}. Por favor comunicate con el usuario: ${user.email}</p>`
          );
        }
      }
    }

    res
      .status(200)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = postOrder;
