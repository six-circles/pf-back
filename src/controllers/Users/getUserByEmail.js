const User = require("../../models/User");
const Product = require("../../models/Product");

const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email: email });

    const products = await Product.find({ user: user._id });

    user.products = products;

    let suma = 0;
    let cantPuntuaciones = 0;

    if (products.length) {
      for (element of products) {
        suma += element.punctuations;
        cantPuntuaciones += element.comments.length;
      }
      promedio = suma / products.length;
      user.punctuation = promedio;
    }

    res.status(200).json({ user: user, cantPuntuaciones: cantPuntuaciones });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getUserByEmail;
