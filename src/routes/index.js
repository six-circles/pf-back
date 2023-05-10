const { Router } = require("express");
const postProduct = require("../controllers/postProduct");

const mainRouter = Router();

mainRouter.post("/product", postProduct);

mainRouter.get("/users", (req, res) => {
  res.status(200).send("Ingresaste a /users");
});

module.exports = mainRouter;
