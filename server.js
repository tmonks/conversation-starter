require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require('path');

const categories = require("./routes/api/categories");
const prompts = require("./routes/api/prompts");

// Config & Connect Database
const dbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
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
app.use("/api/prompts", prompts);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set up helmet middleware for security (using helmet defaults)
app.use(helmet());

//  set Content Security Policy to only load local resources
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"]
    }
  })
);

// Default root route
// app.get("/", (req, res) => {
//   res.sendFile(process.cwd() + "/views/index.html");
// });

// Start app after successful database connection
db.once("open", () => {
  console.log("Connected to DB");
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
