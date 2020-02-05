require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const categories = require("./routes/api/categories");

// Config & Connect Database
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(process.env.DB, dbConfig);
let db = mongoose.connection;

// Check for DB errors
db.on("error", err => {
  console.log(err);
});

// Initialize App
const app = express();

// Set up POST body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Send any requests in '/api/categories' to 'categories.js'
app.use("/api/categories", categories);

// Default root route
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Start app after successful database connection
db.once("open", () => {
  console.log("Connected to DB");
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
