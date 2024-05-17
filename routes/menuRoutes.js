const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");

// POST method to add a menu
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("datamenu saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the menu
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person based on workType
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
