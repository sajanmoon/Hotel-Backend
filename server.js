const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// use the router
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);


app.listen(PORT, () => {
  console.log("listing on port 3000");
});
