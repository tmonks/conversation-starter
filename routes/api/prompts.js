const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Prompt model
const Prompt = require("../../models/Prompt");

// ObjectId
const ObjectId = require("mongoose").Types.ObjectId;

// @route   GET api/prompts
// @desc    GET all Prompts (optionally limited to a category)
// @access  Public
// @parameters: [category_id]
router.get("/", (req, res) => {
  console.log("GET request received for prompts with category_id of " + req.query.category_id);
  Prompt.find({ 
      ...req.query.category_id && { category: req.query.category_id }, 
      reported: false
    })
    .populate("category", "title -_id")
    .then(results => res.send(results))
    .catch(err => {
      console.log(err);
      res.json({ error: "error retrieving prompts" });
    });
});

// @route   GET api/prompts/random
// @desc    GET a random Prompt (optionally limited to a category)
// @access  Public
// @parameters: [category_id], [last_prompt_id]
router.get("/random", (req, res) => {
  const queryParams = {
    ...req.query.category_id && { category: req.query.category_id },
    ...req.query.not_prompt_id && { _id: {$ne: req.query.not_prompt_id }},
    reported: false
  };
  const query = Prompt.find(queryParams);

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
router.post(
  "/",
  [
    check("text")
      .trim()
      .isLength({ min: 25, max: 300 })
      .escape(),
    check("category_id")
      .trim()
      .isMongoId()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({
        error: errors
          .array()
          .map(e => e.param + ": " + e.msg, "")
          .join(", ")
      });
    }
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
        if (err.code === 11000) {
          res.status(409).json({ error: "Prompt already exists" });
        } else {
          res.status(500).json({ error: "Error saving new prompt" });
        }
      });
  }
);

module.exports = router;
