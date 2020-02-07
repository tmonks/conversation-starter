const mongoose = require("mongoose");

let CategorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Category", CategorySchema);
