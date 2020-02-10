const express = require("express");
const router = express.Router();

// Prompt model
const Prompt = require("../../models/Prompt");

// ObjectId
const ObjectId = require("mongoose").Types.ObjectId;

// @route   GET api/prompts
// @desc    GET all Prompts
// @access  Public
router.get("/", (req, res) => {
  console.log("GET request received for prompts with category_id of " + req.query.category_id);
  Prompt.find(req.query.category_id ? { category: req.query.category_id } : {})
    .populate("category", "title -_id")
    .then(results => res.send(results))
    .catch(err => {
      console.log(err);
      res.json({ error: "error retrieving prompts" });
    });
});

// @route   GET api/prompts/random
// @desc    GET a random Prompt
// @access  Public
router.get("/random", (req, res) => {
  const query = Prompt.find(req.query.category_id ? { category: req.query.category_id } : {});

  query
    .countDocuments()
    .then(count => {
      console.log(count + " documents found");

      // calculate a random number between 0 and the document count
      const random = Math.floor(Math.random() * count);

      // retrieve one random document by skipping random number of docs
      query
        .findOne()
        .skip(random)
        .populate("category", "title -_id")
        .then(prompt => {
          res.json(prompt);
        })
        .catch(err => {
          console.log(err);
          res.json({ error: "Error retrieving random prompt" });
        });
    })
    .catch(err => {
      console.log(err);
      res.json({ error: "Error retreiving prompt count" });
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
