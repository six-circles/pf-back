const Product = require("../../models/Product");
const getAllProducts = async (req, res) => {
  const {
    title,
    orderPrice,
    orderTitle,
    orderPunctuations,
    index1,
    index2,
    category,
  } = req.query;
  try {
    let query = Product.find();

    if (title) {
      const minusTitle = title.toLowerCase();
      query = query.where("title").regex(new RegExp(minusTitle, "i"));
    }

    if (orderPrice) {
      query = query.sort({ price: orderPrice });
    } else if (orderTitle) {
      query = query.sort({ title: orderTitle });
    } else if (orderPunctuations) {
      query = query.sort({ punctuations: orderPunctuations });
    }

    const products = await query
      .populate("comments", { products: 0, __v: 0, _id: 0 })
      .populate("questions", { products: 0, __v: 0, _id: 0 })
      .skip(index1)
      .limit(index2);

    if (products.length) {
      res.status(200).json(products);
    } else {
      res.status(404).send("Product is not found.");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllProducts;
