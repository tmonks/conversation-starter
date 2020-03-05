const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Category Model
const Category = require("../../models/Category");

// @route   GET api/categories
// @desc    Get All Categories
// @access  Public
// @parameters (none)
router.get(
  "/",
  /* async */ (req, res) => {
    // try {
    //   const categories = await Category.find().sort({ title: 1 });
    //   res.json(categories);
    // } catch (err) {
    //   console.log(err);
    //   res.json({ error: "Unable to retrieve categories" });
    // }

    Category.find()
      .sort({ title: 1 })
      .then(results => res.json(results))
      .catch(err => {
        console.log(err);
        res.json({ error: "Unable to retrieve categories" });
      });
  }
);

// @route   POST api/categories
// @desc    POST new Category
// @access  Public
// @parameters title
router.post(
  "/",
  [
    check("title")
      .trim()
      .isLength({ min: 4, max: 20 })
      .escape()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({
        error: errors
          .array()
          .map(e => e.param + ": " + e.msg)
          .join(", ")
      });
    }
    console.log("Request received: " + req.body.title);
    const newCategory = new Category({ title: req.body.title });

    newCategory
      .save()
      .then(result => res.json(result))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to save new category" });
      });
  }
);

// @route DELETE api/categories/:id
// @desc  Delete a Category
// @access  Public
// @parameters category_id
router.delete("/:id", [check("category_id").isMongoId()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      error: errors
        .array()
        .map(e => e.param + ": " + e.msg)
        .join(", ")
    });
  }
  const category_id = req.params.id;
  console.log("Received delete request for: " + category_id);

  Category.findById(category_id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ error: "category not found" }));
});

module.exports = router;
