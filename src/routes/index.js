const { Router } = require("express")

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.status(200).send("Ingresaste en /")
})

mainRouter.get("/users", (req, res) => {
  res.status(200).send("Ingresaste a /users")
})

module.exports = mainRouter;