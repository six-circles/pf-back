const Category = require("../../models/Category");
const Product = require("../../models/Product");

const postCategory = async (req, res) => {
  const { title, productId } = req.body;
  try {
    if (!title || !productId) throw Error("Faltan datos");

    const product = await Product.findById(productId);

    const newCategory = await Category.create({
      products: product._id,
      title: title,
    });

    product.categories = product.categories.concat(newCategory._id);

    res
      .status(201)
      .json({ message: "Category created", question: newCategory });
    await product.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = postCategory;
