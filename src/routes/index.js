const { Router } = require("express");
const postUser = require("../controllers/Users/postUsers");
const updateUser = require("../controllers/Users/updateUser");
const deleteUser = require("../controllers/Users/deleteUser");
const getAllProducts = require("../controllers/Products/getAllProducts");
const getProductsById = require("../controllers/Products/getProductsById");
const postProduct = require("../controllers/Products/postProduct");
const updateProducts = require("../controllers/Products/updateProducts");
const postComment = require("../controllers/Comments/postComment");
const getComments = require("../controllers/Comments/getComment");
const deleteComment = require("../controllers/Comments/deleteComment");

const mainRouter = Router();

mainRouter.post("/user", postUser);
mainRouter.patch("/user/:userID", updateUser);
mainRouter.delete("/user/:userID", deleteUser);

mainRouter.get("/product", getAllProducts);
mainRouter.get("/product/:productID", getProductsById);
mainRouter.post("/product", postProduct);
mainRouter.patch("/product/:productID", updateProducts);

mainRouter.get("/product/:productID/comments", getComments);
mainRouter.post("/product/comments", postComment);
mainRouter.delete("/product/comments/:commentID", deleteComment);

module.exports = mainRouter;
