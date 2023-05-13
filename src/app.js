const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const mainRouter = require("./routes");

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(mainRouter);

module.exports = app;
