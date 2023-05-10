const { Router } = require("express");
const postProduct = require("../controllers/Products/postProduct");
const postUser = require("../controllers/Users/postUsers");
const updateUser = require("../controllers/Users/updateUser");
const deleteUser = require("../controllers/Users/deleteUser");

const mainRouter = Router();

mainRouter.post("/product", postProduct);

mainRouter.post("/user", postUser);

mainRouter.patch("/user/:userID", updateUser);

mainRouter.delete("/user/:userID", deleteUser);

module.exports = mainRouter;
