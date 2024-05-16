const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/person");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/person", async (req, res) => {
  try {
    const data = req.body; // assuming the request data contain the person data

    // Create a new person document using the moongoose model
    const newPerson = new Person(data);

    // save the new person to database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("listing on port 3000");
});
