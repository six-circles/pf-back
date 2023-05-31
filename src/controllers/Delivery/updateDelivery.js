const Delivery = require("../../models/Delivery");

const updateDelivery = async (req, res) => {
  const { status, deliveryId } = req.body;
  try {
    if (!status) {
      throw Error("Faltan datos");
    }
    const updateDelivery = await Delivery.findByIdAndUpdate(deliveryId, {
      status: status,
    });
    res.status(200).json({ message: "Producto modificado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = updateDelivery;
