const express = require("express");
const router = express.Router();

// Prompt model
const Prompt = require("../../models/Prompt");

// @route   GET api/prompts
// @desc    GET all Prompts
// @access  Public
router.get("/", (req, res) => {
  console.log("GET request received for prompts");
  // res.json({ error: "GET route not fully baked" });
  Prompt.find()
    .populate("category", "title -_id")
    .then(results => res.send(results))
    .catch(err => {
      console.log(err);
      res.send({ error: "error retrieving prompts" });
    });
});

// @route   POST api/prompts
// @desc    POST new Prompt
// @access  Public
router.post("/", (req, res) => {
  console.log("Request received: " + req.body.text);
  let newPrompt = new Prompt({
    text: req.body.text,
    category: req.body.category_id
  });
  newPrompt
    .save()
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.json({ error: "Error saving new prompt" });
    });
});

module.exports = router;
