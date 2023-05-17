const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();
// const { DB_CONNECTION } = require(process.env);

mongoose.connect(process.env.DB_CONNECTION);
console.log("DB connected successfully");

app.listen(3001, () => {
  console.log("listening on port 3001");
});
