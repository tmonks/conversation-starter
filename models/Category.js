const mongoose = require("mongoose");

const omitPrivate = (doc, obj) => {
  delete obj.__v;
  return obj;
};

let CategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  { toJSON: { transform: omitPrivate } }
);

module.exports = mongoose.model("Category", CategorySchema);
