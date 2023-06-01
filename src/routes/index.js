const { Router } = require("express");

const postUser = require("../controllers/Users/postUsers");
const updateUser = require("../controllers/Users/updateUser");
const deleteUser = require("../controllers/Users/deleteUser");
const getAllProducts = require("../controllers/Products/getAllProducts");
const getProductsById = require("../controllers/Products/getProductsById");
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
const postSC = require("../controllers/ShoppingCart/postSC");
const getSC = require("../controllers/ShoppingCart/getSC");
const deleteSC = require("../controllers/ShoppingCart/deleteSC");
const login = require("../handlers/Login/login");
const googleLogin = require("../handlers/Login/googleLogin");
const goToGoogle = require("../handlers/Login/goToGoogle");
const goToFacebook = require("../handlers/Login/goToFacebook");
const facebookLogin = require("../handlers/Login/facebookLogin");
const getProductsByUserId = require("../controllers/Products/getProductsByUserId");
const getCommentsByUser = require("../controllers/Comments/getCommentsByUser");
const getQuestionsByUser = require("../controllers/QA/getQByUser");
const getFavorites = require("../controllers/Favorites/getFavorites");
const postFavorites = require("../controllers/Favorites/postFavorites");
const deleteFavorites = require("../controllers/Favorites/deleteFavorites");
const handlerMercadoPago = require("../controllers/MercadoPago/checkout");
const postOrder = require("../controllers/Order/postOrder");
const getOrder = require("../controllers/Order/getOrder");
const getOrdersById = require("../controllers/Order/getOrdersById");
const getSales = require("../controllers/Order/getSales");
const eraseSC = require("../controllers/ShoppingCart/eraseSC");
const deleteProduct = require("../controllers/Products/deleteProduct");

const postProduct = require("../controllers/Products/postProducts");

const checkLogin = require("../handlers/Login/checkLogin");
const uploadMultiple = require("../config/multer");
const forgotPassword = require("../controllers/Password/forgotPassword");
const resetPassword = require("../controllers/Password/resetPassword");
const postResetPassword = require("../controllers/Password/postResetPassword");
const enableUserById = require("../controllers/Users/enableUserById");

const getOrderDeliveries = require("../controllers/Delivery/getOrderDeliveries");
const updateDelivery = require("../controllers/Delivery/updateDelivery");

const mainRouter = Router();

mainRouter.use("/login", login);

mainRouter.post("/forgot-password", forgotPassword);
mainRouter.get("/reset-password/:email/:token", resetPassword);
mainRouter.post("/reset-password/:email/:token", postResetPassword);

mainRouter.get("/users", getUsers);
mainRouter.get("/user/:token", getUserById);
mainRouter.get("/user", getUserByEmail);
mainRouter.post("/user", postUser);
mainRouter.patch("/user/:token", checkLogin, updateUser);
mainRouter.delete("/user/:token", checkLogin, deleteUser);
mainRouter.patch("/user", enableUserById);

mainRouter.get("/product", getAllProducts);
mainRouter.get("/product/:productID", getProductsById);
mainRouter.get("/:token/product", getProductsByUser);
mainRouter.get("/product/moreproducts/:id", getProductsByUserId);
mainRouter.post("/product", checkLogin, uploadMultiple, postProduct);
mainRouter.patch("/product/:productID", checkLogin, updateProducts);
mainRouter.delete("/product/:productId", deleteProduct);

mainRouter.get("/product/:productID/comments", getComments);
mainRouter.post("/product/comments", checkLogin, postComment);
mainRouter.delete(
  "/product/:productID/comments/:commentID",
  checkLogin,
  deleteComment
);
mainRouter.get("/product/comments/:token", checkLogin, getCommentsByUser);

mainRouter.get("/product/questions/:id", getQuestions);
mainRouter.post("/product/questions", /*checkLogin,*/ postQuestions);
mainRouter.delete("/product/questions/:id", checkLogin, deleteQuestions);

mainRouter.get("/product/questions/answers/:id", getAnswers);

mainRouter.post("/product/questions/answers" /*, checkLogin*/, postAnswers);
mainRouter.delete("/product/questions/answers/:id", checkLogin, deleteAnswers);
mainRouter.get("/questions/:token", checkLogin, getQuestionsByUser);

// mainRouter.get("/delivery/buyer/:token" /*, checkLogin*/, getDeliveryById);
// mainRouter.get("/delivery/seller/:token", getDeliveryBySellerId);
// mainRouter.post("/delivery" /*, checkLogin*/, postDelivery);
// mainRouter.delete("/delivery/:id", checkLogin, deleteDelivery);

mainRouter.get("/:token/shoppingCart", getSC);
mainRouter.post("/user/shoppingCart", postSC);
mainRouter.delete("/:token/shoppingCart/:productID", deleteSC);
mainRouter.delete("/shoppingCart/:token", eraseSC);

mainRouter.get("/:token/favorites", getFavorites);
mainRouter.post("/user/favorites", postFavorites);
mainRouter.delete("/:token/favorites/:productID", deleteFavorites);

mainRouter.get("/auth/google", goToGoogle);
mainRouter.get("/auth/google/callback", googleLogin);
mainRouter.get("/auth/facebook", goToFacebook);
mainRouter.get("/auth/facebook/callback", facebookLogin);

mainRouter.post("/mercadopago/:token", handlerMercadoPago);

mainRouter.post("/order", postOrder);
mainRouter.get("/order/:orderId/:token", getOrder);
mainRouter.get("/order/:token", getOrdersById);
mainRouter.get("/sales/:token", getSales);

mainRouter.get("/deliveries/:orderId", getOrderDeliveries);
mainRouter.patch("/delivery/:id", /* checkLogin,*/ updateDelivery);
module.exports = mainRouter;
