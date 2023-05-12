const Product = require("../../models/Product");

const getAllProducts = async (req, res) => {
  const { title } = req.query;
  try {
    const products = await Product.find()
      .populate("comments", {
        products: 0,
        __v: 0,
        _id: 0,
      })
      .populate("questions", {
        products: 0,
        __v: 0,
        _id: 0,
      });

    if (title) {
      const minusTitle = title.toLowerCase();
      const productsName = [];
      for (let i=0; i<products.length;i++) {
        let include = products[i].title.toLowerCase().includes(minusTitle);
        if (include) {
          productsName.push(products[i]);
        }
      };
      productsName.length
        ? res.status(200).json(productsName)
        : res.status(404).send("Product is not found.");
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = getAllProducts;
