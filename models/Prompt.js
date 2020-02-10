const mongoose = require("mongoose");

const omitPrivate = (doc, obj) => {
  delete obj.__v;
  return obj;
};

const PromptSchema = mongoose.Schema(
  {
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
  },
  { toJSON: { transform: omitPrivate } }
);

module.exports = mongoose.model("Prompt", PromptSchema);
