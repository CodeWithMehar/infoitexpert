const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const { routes } = require("./app/route");

let app = express();

// Apply CORS and JSON parsing middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Use routes
app.use(routes);

// Connect to MongoDB and start the server
mongoose.connect('mongodb://127.0.0.1:27017/williamSite').then(() => {
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});
