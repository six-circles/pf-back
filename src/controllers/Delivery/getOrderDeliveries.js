const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

function getStatus(input, userId) {
  // Split the input string into an array of user-status pairs
  if (!userId) return;

  let entries = input.split(";");

  // Look for the user's status
  for (let i = 0; i < entries.length; i++) {
    const [id, status] = entries[i].split(":");
    if (id === userId) {
      return status;
    }
  }

  return "0";
}

const getOrderDeliveries = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId).populate("shoppingCart", {
      title: 1,
      image: 1,
      punctuations: 1,
      price: 1,
      stock: 1,
      condition: 1,
      enable: 1,
    });

    console.log("order: ", order);
    if (!order) throw Error("No existe la orden");
    // Return this [{status: 0, productID: 17}, {status:0, productId: 18}, {status: 1, productID: 19}, {status:1, productId: 20}]

    const response = await Promise.all(
      order.shoppingCart.map(async (product) => {
        // Cual de los vendedores es el que vende el producto.
        // const user = await User.findById(userId.userId);
        // const products = await Product.find({ user: user })
        console.log("product: ", product);
        const products = await Product.findById(product._id).populate("user", {
          _id: 1,
          name: 1,
          email: 1,
        });

        console.log("products: ", products);

        // const thisProductSeller = products?.find((p) => {
        //   return p._id.toString() === product._id.toString();
        // });

        console.log("------------------");
        console.log("final: ", products?.user?._id);

        return {
          status: getStatus(order.status, products?.user?._id.toString()) || 0,
          productId: product._id,
        };
      })
    );
    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = getOrderDeliveries;
