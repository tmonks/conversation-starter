const mongoose = require("mongoose");

const PromptSchema = {
  text: {
    type: String,
    require: true,
    unique: true
  },
  reported: {
    type: Boolean,
    default: false
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }
};

module.exports = mongoose.model("Prompt", PromptSchema);
