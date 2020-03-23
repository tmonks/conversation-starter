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
      default: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category"
    }
  },
  { toJSON: { transform: omitPrivate } }
);

module.exports = mongoose.model("Prompt", PromptSchema);
