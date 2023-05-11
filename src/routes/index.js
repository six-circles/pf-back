const { Router } = require("express");
const postProduct = require("../controllers/Products/postProduct");
const postUser = require("../controllers/Users/postUsers");
const updateUser = require("../controllers/Users/updateUser");
const deleteUser = require("../controllers/Users/deleteUser");
const getProducts = require("../controllers/Products/getProducts");
const postProduct = require("../controllers/Products/postProduct");
const updateProducts = require("../controllers/Products/updateProducts");
const postComment = require("../controllers/Comments/postComment");
const getComments = require("../controllers/Comments/getComment");

const mainRouter = Router();

mainRouter.post("/user", postUser);
mainRouter.patch("/user/:userID", updateUser);
mainRouter.delete("/user/:userID", deleteUser);

mainRouter.get("/product", getProducts);
mainRouter.post("/product", postProduct);
mainRouter.patch("/product/:id", updateProducts);

mainRouter.post("/product/comments", postComment);
mainRouter.get("/product/comments", getComments);

module.exports = mainRouter;
