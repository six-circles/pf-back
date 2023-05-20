const Product = require("../../models/Product");
const getAllProducts = async (req, res) => {
  const {
    search,
    order,
    index,
    category,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  } = req.query;
  try {
    let query = Product.find();

    if (search) {
      const minusTitle = search.toLowerCase();
      query = query.where("title").regex(new RegExp(minusTitle, "i"));
    }

    if (order) {
      if (order === "-price") {
        query = query.sort({ price: -1 });
      } else if (order === "price") {
        query = query.sort({ price: 1 });
      } else if (order === "-title") {
        query = query.sort({ title: -1 });
      } else if (order === "title") {
        query = query.sort({ title: 1 });
      } else if (order === "-punctuations") {
        query = query.sort({ punctuations: -1 });
      } else if (order === "punctuations") {
        query = query.sort({ punctuations: 1 });
      }
    }

    if (category) {
      query = query.where("category").equals(category);
    }
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) {
        priceFilter.$gte = minPrice;
      }
      if (maxPrice) {
        priceFilter.$lte = maxPrice;
      }
      query = query.where("price", priceFilter);
    }
    if (minRating || maxRating) {
      const ratingFilter = {};
      if (minRating) {
        ratingFilter.$gte = minRating;
      }
      if (maxRating) {
        ratingFilter.$lte = maxRating;
      }
      query = query.where("punctuations", ratingFilter);
    }

    const products = await query
      .populate("comments", { products: 0, __v: 0, _id: 0 })
      .populate("questions", { products: 0, __v: 0, _id: 0 })
      .skip(index)
      .limit(13);

    const productsEnabled = [];
    products.forEach((element) => {
      if (element.enable === true) {
        productsEnabled.push(element);
      }
    });

    if (productsEnabled.length) {
      res
        .status(200)
        .json({ products: productsEnabled, cantidad: productsEnabled.length });
    } else {
      res.status(404).send("Product is not found.");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllProducts;
