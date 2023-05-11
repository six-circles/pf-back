const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const getProducts = require("./controllers/Products/getProducts");
const postProduct = require("./controllers/Products/postProduct");
const updateProducts = require("./controllers/Products/updateProducts");
const postComment = require("./controllers/Comments/postComment");
const getComments = require("./controllers/Comments/getComment");
const mainRouter = require("./routes");

const app = express();
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(mainRouter);

mainRouter.get("/product", getProducts);
mainRouter.post("/product", postProduct);
mainRouter.patch("/product/:id", updateProducts);

mainRouter.post("/product/comments", postComment);
mainRouter.get("/product/comments", getComments);

module.exports = app;
