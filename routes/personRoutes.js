const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

// POST method to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming the request data contain the person data

    // Create a new person document using the moongoose model
    const newPerson = new Person(data);

    // save the new person to database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person based on workType
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT method to update the person data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //Extract the id from the url parameter
    const updatePersonData = req.body; //Updated ID for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //Return the updated document
        runValidators: true, //Run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
