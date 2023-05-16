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
      })
      .skip(index1)
      .limit(index2);

    const productsPaginated = await Product.find().skip(index1).limit(index2);
    // console.log(productsPaginated);

    if (orderPrice) {
      const productsOrdered = await Product.find()
        .sort({ price: orderPrice })
        .populate("comments", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .populate("questions", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .skip(index1)
        .limit(index2);
      res.status(200).json(productsOrdered);
    } else if (orderTitle) {
      const productsOrdered = await Product.find()
        .sort({ title: orderTitle })
        .populate("comments", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .populate("questions", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .skip(index1)
        .limit(index2);
      res.status(200).json(productsOrdered);
    } else if (orderPunctuations) {
      const productsOrdered = await Product.find()
        .sort({
          punctuations: orderPunctuations,
        })
        .populate("comments", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .populate("questions", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .skip(index1)
        .limit(index2);
      res.status(200).json(productsOrdered);
    } else if (category) {
      Product.find()
        .populate("comments", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .populate("questions", {
          products: 0,
          __v: 0,
          _id: 0,
        })
        .populate({ path: "categories", match: { title: category } })
        .then((products) => {
          const productsByCategory = products.filter(
            (product) => product.categories.length > 0
          );
          res.status(200).json(productsByCategory);
        })
        .catch((error) => {
          console.log(error);
          return res.send(error.message);
        });
    } else if (title) {
      const lowerTitle = title.toLowerCase();
      const productsName = [];
      for (let i = 0; i < products.length; i++) {
        let include = products[i].title.toLowerCase().includes(lowerTitle);
        if (include) {
          productsName.push(products[i]);
        }
      }
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
