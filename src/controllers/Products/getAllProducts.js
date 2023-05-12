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
      const myArray = [];
      //todo PROBLEMAS PARA FILTRAR EL ARRAY DE PRODUCTOS EN BASE AL TITULO
      //todo LA LINEA DE COMPARACION ENTRE AMBAS MINUSCULAS FUNCIONA BIEN, EL PROBLEMA ES EL "FILTER", DEVUELVE ARRAY VACIO.
      // const productsName = products.filter((prod) => {
      //   prod.title.toLowerCase().includes(minusTitle);
      // });
      console.log(products[0].title.toLowerCase().includes(minusTitle));

      for (let prod of products) {
        let include = products[prod].title.toLowerCase().includes(minusTitle);
        if (include) {
          myArray.push(products[prod]);
        }
      }
      console.log({ res: myArray });
      // console.log(
      //   products.filter((prod) => {
      //     prod.title.toLowerCase().includes(minusTitle);
      //   })
      // );

      productsName
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
