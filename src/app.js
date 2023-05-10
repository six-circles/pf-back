const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const getProducts = require("./controllers/getProducts");
const postProduct = require("./controllers/postProduct");
const updateProducts = require("./controllers/updateProducts");
const mainRouter = require("./routes");

const app = express();
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(mainRouter);

mainRouter.get("/product", getProducts);
mainRouter.post("/product", postProduct);
mainRouter.patch("/product/:id", updateProducts);

module.exports = app;
