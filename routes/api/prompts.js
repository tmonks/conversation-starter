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
  Prompt.aggregate([
    // req.query.category_id ? { $match: { category: ObjectId(req.query.category_id) } } : null,
    { $match: req.query.category_id ? { category: ObjectId(req.query.category_id) } : {} },
    { $sample: { size: 1 } },
    {
      $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" }
    },
    { $unwind: "$category" },
    {
      $project: {
        "category._id": 0,
        "category.reported": 0,
        "category.__v": 0,
        "category.prompts": 0 // should be able to get rid of this one
      }
    }
  ])
    .then(results => res.send(results))
    .catch(err => {
      console.log(err);
      res.json({ error: "error retrieving a random prompt" });
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
