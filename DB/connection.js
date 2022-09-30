const mongoose = require("mongoose");

const DB = process.env.DATA_BASE;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection sucessfully");
  })
  .catch((err) => console.log("connection faild"));
