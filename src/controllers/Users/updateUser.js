const User = require("../../models/User");

const updateUser = async (req, res) => {
  const { token } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    const userId = jwt.verify(token, process.env.SECRET_KEY_JWT);
    if (!userId) throw Error("No estas logueado");
    const user = await User.findById(userId.userId);

    const hash = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      name: name,
      email: email,
      phone: phone,
      password: hash,
    });
    res.status(201).send({ message: "User updated" });
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
};
module.exports = updateUser;
