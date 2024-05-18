const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const passport = require("./auth");

const PORT = process.env.PORT || 3000;

// Middleware function
// const logRequest = (req, res, next) => {
//   console.log(
//     `[${new Date().toLocaleString()}] Requeest made to:${req.orignalUrl}`
//   );
//   next();
// };
// app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// use the router
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listing on port 3000");
});
