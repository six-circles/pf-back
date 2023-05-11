const Delivery = require("../../models/Delivery");
const postDelivery = async (req, res) => {
  const { type, status, weight } = req.body;
  try {
    if (!type || !status || !weight) throw Error("Faltan datos");

    const newDelivery = await Delivery.create({
      type: type,
      status: status,
      weight: weight,
    });
    res.status(201).send({ message: "Delivery created", user: newDelivery });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = postDelivery;
