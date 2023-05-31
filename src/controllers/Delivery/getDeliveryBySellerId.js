const Delivery = require("../../models/Delivery");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const getDeliveryBySellerId = async (req, res) => {
  const { token } = req.params;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estás logueado");
    const userIdObject = new mongoose.Types.ObjectId(userId.userId);

    const delivery = await Delivery.find({ seller: userIdObject });

    res.status(200).json({ delivery: delivery });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getDeliveryBySellerId;
