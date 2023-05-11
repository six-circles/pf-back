const Delivery = require("../../models/Delivery");
const postDelivery = async (req, res) => {
  const { type, status, weigth } = req.body;
  try {
    if (!name || !email || !phone || !password || !birthday)
      throw Error("Faltan datos");

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      password: hash,
      birthday: birthday,
    });
    res.status(201).send({ message: "User created", user: newUser });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = postDelivery;
