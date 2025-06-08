require('dotenv').config();  // Load environment variables from .env file

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const { routes } = require("./app/route");

const app = express();

// Allow only your frontend domain to access backend API
app.use(cors({
 origin: ['https://infoitexpert.com', 'https://www.infoitexpert.com'],  // <-- yahan aapka live frontend domain likhein, https important hai
  credentials: true,
}));

// Middleware to parse JSON requests
app.use(express.json());

// Handle preflight OPTIONS requests for all routes (important for POST/PUT requests)
app.options("*", cors({
  origin: 'https://infoitexpert.com',
  credentials: true,
}));

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
