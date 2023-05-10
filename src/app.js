const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const mainRouter = require("./routes");

app.use(morgan("dev"));

app.use(mainRouter);

module.exports = app;
