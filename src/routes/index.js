const { Router } = require("express");
require("dotenv").config();
const axios = require("axios");
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

const checkLogin = require("../handlers/Login/checkLogin");

const mainRouter = Router();

mainRouter.use("/login", login);

mainRouter.get("/users", getUsers);
mainRouter.get("/user/:id", getUserById);
mainRouter.get("/user", getUserByEmail);
mainRouter.post("/user", postUser);
mainRouter.patch("/user/:userID", checkLogin, updateUser);
mainRouter.delete("/user/:userID", checkLogin, deleteUser);

mainRouter.get("/product", getAllProducts);
mainRouter.get("/product/:productID", getProductsById);
mainRouter.get("/:token/product", getProductsByUser);
mainRouter.post("/product", checkLogin, postProduct);
mainRouter.patch("/product/:productID", checkLogin, updateProducts);

mainRouter.get("/product/:productID/comments", getComments);
mainRouter.post("/product/comments", checkLogin, postComment);
mainRouter.delete(
  "/product/:productID/comments/:commentID",
  checkLogin,
  deleteComment
);

mainRouter.get("/product/questions/:id", getQuestions);
mainRouter.post("/product/questions", checkLogin, postQuestions);
mainRouter.delete("/product/questions/:id", checkLogin, deleteQuestions);

mainRouter.get("/product/questions/answers/:id", getAnswers);
mainRouter.post("/product/questions/answers", checkLogin, postAnswers);
mainRouter.delete(
  "/product/questions/answers/:id",
  /*checkLogin ,*/ deleteAnswers
);

mainRouter.get("/delivery/:id", /*checkLogin ,*/ getDeliveryById);
mainRouter.post("/delivery", /*checkLogin ,*/ postDelivery);
mainRouter.patch("/delivery/:id", /*checkLogin ,*/ updateDelivery);
mainRouter.delete("/delivery/:id", /*checkLogin ,*/ deleteDelivery);

mainRouter.get("/:userID/shoppingCart", getSC);
mainRouter.post("/user/shoppingCart", postSC);
mainRouter.delete("/:userID/shoppingCart/:productID", deleteSC);

mainRouter.get("/auth/google", (req, res) => {
  // Redirige al usuario a la página de inicio de sesión de Google
  const scope = ["profile", "email"]; // Define los alcances que necesitas
  const redirectUri = "http://localhost:3001/auth/google/callback";
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    process.env.GOOGLE_CLIENT_ID
  }&redirect_uri=${redirectUri}&response_type=code&scope=${scope.join("+")}`;
  res.redirect(authUrl);
});

mainRouter.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code; // Obtiene el código de autorización de la URL de retorno
  const redirectUri = "http://localhost:3001/auth/google/callback";

  // Intercambia el código de autorización por un token de acceso
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  try {
    const response = await axios.post(tokenUrl, data);
    const accessToken = response.data.access_token;

    // Utiliza el token de acceso para realizar operaciones con la API de Google, como obtener información del usuario
    const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
    const userResponse = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = userResponse.data;

    // Aquí puedes hacer lo que necesites con los datos del usuario obtenidos de Google

    // Redirige o responde con los datos del usuario según tu lógica de aplicación
    res.status(200).json({ message: "Login By Google successfully" });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).send("Error en la autenticación con Google");
  }
});

module.exports = mainRouter;
