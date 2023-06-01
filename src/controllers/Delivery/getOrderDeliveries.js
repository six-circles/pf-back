const Order = require("../../models/Order");

function getStatus(input, userId) {
  // Split the input string into an array of user-status pairs
  let entries = input.split(';');

  // Look for the user's status
  for (let i = 0; i < entries.length; i++) {
    const [id, status] = entries[i].split(':');
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
    console.log(order);
    if (!order) throw Error("No existe la orden");
    // Return this [{status: 0, productID: 17}, {status:0, productId: 18}, {status: 1, productID: 19}, {status:1, productId: 20}]

    const response = order.shoppingCart.map((product) => {
      return {
        status: getStatus(order.status, product.user.toString()),
        productId: product._id,
      };
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};


module.exports = getOrderDeliveries;
