const mongoose = require("mongoose");

// Question Schema
const PromptSchema = {
  text: {
    type: String,
    require: true
  }
};

// Category Schema
let CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  prompts: [PromptSchema]
});

module.exports = mongoose.model("Category", CategorySchema);
