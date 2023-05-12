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
const getProductsByUser = require("../controllers/Products/getProductsByUser");
const getQuestions = require("../controllers/QA/getQ");
const postQuestions = require("../controllers/QA/postQ");
const deleteQuestions = require("../controllers/QA/deleteQ");
const getUsers = require("../controllers/Users/getUsers");
const getUserById = require("../controllers/Users/getUserById");
const getUserByEmail = require("../controllers/Users/getUserByEmail");
const deleteAnswers = require("../controllers/QA/deleteA");
const getAnswers = require("../controllers/QA/getA");
const postAnswers = require("../controllers/QA/postA");
const postDelivery = require("../controllers/Delivery/postDelivery");
const getDeliveryById = require("../controllers/Delivery/getDeliveryById");
const updateDelivery = require("../controllers/Delivery/updateDelivery");
const deleteDelivery = require("../controllers/Delivery/deleteDelivery");
const login = require("../handlers/Login/login");

const checkLogin = require("../handlers/Login/checkLogin");

const mainRouter = Router();

mainRouter.use("/login", login);

mainRouter.get("/users", getUsers);
mainRouter.get("/user/:id", getUserById);
mainRouter.get("/user", getUserByEmail);
mainRouter.post("/user", postUser);
mainRouter.patch("/user/:userID", /*checkLogin ,*/ updateUser);
mainRouter.delete("/user/:userID", /*checkLogin ,*/ deleteUser);

mainRouter.get("/product", getAllProducts);
mainRouter.get("/product/:productID", getProductsById);
mainRouter.get("/:userID/product", getProductsByUser);
mainRouter.post("/product", /*checkLogin ,*/ postProduct);
mainRouter.patch("/product/:productID", /*checkLogin ,*/ updateProducts);

mainRouter.get("/product/:productID/comments", getComments);
mainRouter.post("/product/comments", /*checkLogin ,*/ postComment);
mainRouter.delete(
  "/product/comments/:commentID",
  /*checkLogin ,*/ deleteComment
);

mainRouter.get("/product/questions/:id", getQuestions);
mainRouter.post("/product/questions", /*checkLogin ,*/ postQuestions);
mainRouter.delete("/product/questions/:id", /*checkLogin ,*/ deleteQuestions);

mainRouter.get("/product/questions/answers/:id", getAnswers);
mainRouter.post("/product/questions/answers", /*checkLogin ,*/ postAnswers);
mainRouter.delete(
  "/product/questions/answers/:id",
  /*checkLogin ,*/ deleteAnswers
);

mainRouter.get("/delivery/:id", /*checkLogin ,*/ getDeliveryById);
mainRouter.post("/delivery", /*checkLogin ,*/ postDelivery);
mainRouter.patch("/delivery/:id", /*checkLogin ,*/ updateDelivery);
mainRouter.delete("/delivery/:id", /*checkLogin ,*/ deleteDelivery);

module.exports = mainRouter;
