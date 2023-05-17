const Delivery = require("../../models/Delivery");
const deleteDelivery = async (req, res) => {
  const { id } = req.params;
  try {
    await Delivery.findByIdAndRemove(id);
    res.status(201).send({ message: "Delivery deleted" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = deleteDelivery;
