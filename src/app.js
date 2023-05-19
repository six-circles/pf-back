const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mainRouter = require("./routes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(mainRouter);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

module.exports = app;
