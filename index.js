require('dotenv').config();  // Load environment variables from .env file

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const { routes } = require("./app/route");

const app = express();

// Middleware for CORS and parsing JSON requests
app.use(cors());
app.use(express.json());

// Use your routes
app.use(routes);

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
    // Start server only after successful DB connection
    app.listen(8000, () => {
      console.log('Server is running on port 8000');
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });
