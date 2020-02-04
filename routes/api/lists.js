const express = require("express");
const router = express.Router();

// List Model
const List = require("../../models/list");

// @route   GET api/lists
// @desc    Get All Lists
// @access  Public
router.get("/", async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    console.log(err);
    res.json({ error: "Unable to retrieve lists" });
  }
});

// @route   POST api/lists
// @desc    POST new List
// @access  Public
router.post("/", async (req, res) => {
  console.log("Request received: " + req.body.title);
  const newList = new List({ title: req.body.title });

  try {
    await newList.save();
    console.log("New list saved successfully");
    res.send(req.body.title + " saved successfully");
  } catch (err) {
    console.log(err);
    res.send("Error saving new list");
  }
});

module.exports = router;
