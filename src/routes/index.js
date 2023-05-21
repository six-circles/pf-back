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
const postSC = require("../controllers/ShoppingCart/postSC");
const getSC = require("../controllers/ShoppingCart/getSC");
const deleteSC = require("../controllers/ShoppingCart/deleteSC");
const login = require("../handlers/Login/login");
const googleLogin = require("../handlers/Login/googleLogin");
const goToGoogle = require("../handlers/Login/goToGoogle");
const goToFacebook = require("../handlers/Login/goToFacebook");
const facebookLogin = require("../handlers/Login/facebookLogin");
const getProductsByUserId = require("../controllers/Products/getProductsByUserId");

const upload = require("../config/multer");

const getCommentsByUser = require("../controllers/Comments/getCommentsByUser");
const getQuestionsByUser = require("../controllers/QA/getQByUser");
const getFavorites = require("../controllers/Favorites/getFavorites");
const postFavorites = require("../controllers/Favorites/postFavorites");
const deleteFavorites = require("../controllers/Favorites/deleteFavorites");


const checkLogin = require("../handlers/Login/checkLogin");

const mainRouter = Router();

mainRouter.use("/login", login);

mainRouter.get("/users", getUsers);
mainRouter.get("/user/:token", getUserById);
mainRouter.get("/user", getUserByEmail);
mainRouter.post("/user", postUser);
mainRouter.patch("/user/:token", checkLogin, updateUser);
mainRouter.delete("/user/:token", checkLogin, deleteUser);

mainRouter.get("/product", getAllProducts);
mainRouter.get("/product/:productID", getProductsById);
mainRouter.get("/:token/product", getProductsByUser);
mainRouter.post("/product", checkLogin, upload.single("image"), postProduct);
mainRouter.patch("/product/:productID" /*, checkLogin*/, updateProducts);
mainRouter.get("/product/moreproducts/:id", getProductsByUserId);

mainRouter.get("/product/:productID/comments", getComments);
mainRouter.post("/product/comments", checkLogin, postComment);
mainRouter.delete(
  "/product/:productID/comments/:commentID",
  checkLogin,
  deleteComment
);
mainRouter.get("/product/comments/:token", /*checkLogin,*/ getCommentsByUser);

mainRouter.get("/product/questions/:id", getQuestions);
mainRouter.post("/product/questions", checkLogin, postQuestions);
mainRouter.delete("/product/questions/:id", checkLogin, deleteQuestions);

mainRouter.get("/product/questions/answers/:id", getAnswers);
mainRouter.post("/product/questions/answers", checkLogin, postAnswers);
mainRouter.delete(
  "/product/questions/answers/:id",
  /*checkLogin ,*/ deleteAnswers
);
mainRouter.get("/questions/:token", /*checkLogin,*/ getQuestionsByUser);

mainRouter.get("/delivery/:id", /*checkLogin ,*/ getDeliveryById);
mainRouter.post("/delivery", /*checkLogin ,*/ postDelivery);
mainRouter.patch("/delivery/:id", /*checkLogin ,*/ updateDelivery);
mainRouter.delete("/delivery/:id", /*checkLogin ,*/ deleteDelivery);

mainRouter.get("/:token/shoppingCart", getSC);
mainRouter.post("/user/shoppingCart", postSC);
mainRouter.delete("/:token/shoppingCart/:productID", deleteSC);

mainRouter.get("/:token/favorites", getFavorites);
mainRouter.post("/user/favorites", postFavorites);
mainRouter.delete("/:token/favorites/:productID", deleteFavorites);

mainRouter.get("/auth/google", goToGoogle);
mainRouter.get("/auth/google/callback", googleLogin);
mainRouter.get("/auth/facebook", goToFacebook);
mainRouter.get("/auth/facebook/callback", facebookLogin);

module.exports = mainRouter;
