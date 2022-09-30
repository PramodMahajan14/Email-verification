const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
app.use(express.json());
// require("./DB/connection");
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/static")));

console.log(__dirname, "/static");
app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "/static"));
});

app.use("/api", require("./controller/userapi"));

app.listen(PORT, () => {
  console.log("Running server on PORT ", PORT);
});
