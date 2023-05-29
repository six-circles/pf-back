const Order = require("../../models/Order");

const getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    res.status(200).json({ order: order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = getOrder;
