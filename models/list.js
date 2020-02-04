const mongoose = require("mongoose");

// Question Schema
const QuestionSchema = {
  text: {
    type: String,
    require: true
  }
};

// List Schema
let listSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: [QuestionSchema]
});

module.exports = mongoose.model("List", listSchema);
