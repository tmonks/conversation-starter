require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const lists = require("./routes/api/lists");

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

// Load Models
// const List = require("./models/list");

// Setup routes

// Send any requests in '/api/lists' to 'lists.js'
app.use("/api/lists", lists);

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
