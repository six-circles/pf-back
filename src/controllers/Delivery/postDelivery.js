const Delivery = require("../../models/Delivery");
const postDelivery = async (req, res) => {
  const { type, status } = req.body;
  try {
    if (!type || !status) throw Error("Faltan datos");

    const newDelivery = await Delivery.create({
      type: type,
      status: status,
    });
    res.status(201).send({ message: "Delivery created", user: newDelivery });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = postDelivery;
