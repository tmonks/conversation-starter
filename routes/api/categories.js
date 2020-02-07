const express = require("express");
const router = express.Router();

// Category Model
const Category = require("../../models/Category");

// @route   GET api/categories
// @desc    Get All Categories
// @access  Public
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
router.post(
  "/",
  /* async */ (req, res) => {
    console.log("Request received: " + req.body.title);
    const newCategory = new Category({ title: req.body.title });

    /*
  try {
    await newCategory.save();
    console.log("New category saved successfully");
    res.json(newCategory);
  } catch (err) {
    console.log(err);
    res.send("Error saving new list");
  }
  */

    newCategory
      .save()
      .then(result => res.json(result))
      .catch(err => {
        console.log(err);
        res.json({ error: "Unable to save new category" });
      });
  }
);

// @route DELETE api/categories/:id
// @desc  Delete a Category
// @access  Public
router.delete(
  "/:id",
  /* async */ (req, res) => {
    const category_id = req.params.id;
    console.log("Received delete request for: " + category_id);

    /*
  try {
    const categoryToDelete = await Category.findById(conversation_id);
    if (!categoryToDelete) {
      throw new Error("category " + conversation_id + " not found");
    }
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false });
  }
  */
    Category.findById(category_id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
