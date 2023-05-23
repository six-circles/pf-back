const ProductCloudinary = require("../../models/Product");
const getProductCloudinary = async (req, res) => {
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
    let queryProducts = ProductCloudinary.find();

    const allProducts = await ProductCloudinary.find();

    const pages = Math.ceil(allProducts.length / 12);

    if (search) {
      const minusTitle = search.toLowerCase();
      queryProducts = queryProducts
        .where("title")
        .regex(new RegExp(minusTitle, "i"));
    }

    if (order) {
      if (order === "-price") {
        queryProducts = queryProducts.sort({ price: -1 });
      } else if (order === "price") {
        queryProducts = queryProducts.sort({ price: 1 });
      } else if (order === "-title") {
        queryProducts = queryProducts.sort({ title: -1 });
      } else if (order === "title") {
        queryProducts = queryProducts.sort({ title: 1 });
      } else if (order === "-punctuations") {
        queryProducts = queryProducts.sort({ punctuations: -1 });
      } else if (order === "punctuations") {
        queryProducts = queryProducts.sort({ punctuations: 1 });
      }
    }

    if (category) {
      queryProducts = queryProducts.where("category").equals(category);
    }
    if (minPrice || maxPrice) {
      const priceFilter = {};
      if (minPrice) {
        priceFilter.$gte = minPrice;
      }
      if (maxPrice) {
        priceFilter.$lte = maxPrice;
      }
      queryProducts = queryProducts.where("price", priceFilter);
    }
    if (minRating || maxRating) {
      const ratingFilter = {};
      if (minRating) {
        ratingFilter.$gte = minRating;
      }
      if (maxRating) {
        ratingFilter.$lte = maxRating;
      }
      queryProducts = queryProducts.where("punctuations", ratingFilter);
    }

    const products = await queryProducts
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

    const pagesFiltered = Math.ceil(productsEnabled.length / 12);

    if (productsEnabled.length) {
      res.status(200).json({
        products: productsEnabled,
        cantidad:
          category || minPrice || maxPrice || minRating || maxRating || search
            ? pagesFiltered
            : pages,
      });
    } else {
      res.status(404).send("Product is not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = getProductCloudinary;
