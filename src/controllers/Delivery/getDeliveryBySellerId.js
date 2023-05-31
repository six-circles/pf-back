const Delivery = require("../../models/Delivery");
const jwt = require("jsonwebtoken");

const getDeliveryBySellerId = async (req, res) => {
  const { token } = req.body;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");

    const delivery = await Delivery.find({ seller: userId.userId });

    res.status(200).json(delivery);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getDeliveryBySellerId;
