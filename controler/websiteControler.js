// Import necessary modules for validation and model
const { body, validationResult } = require("express-validator");

const contactModal = require("../model/contactModal");
const popupModal = require("../model/popupModal");

// Contact form controller
let contact = [
  // Validate and sanitize fields
  body("name").trim().notEmpty().withMessage("Name is required").escape(),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("tel")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?[0-9\s()-]*$/)
    .withMessage("Invalid phone number"),

  // Process request after validation and sanitization
  async (req, res) => {
    // Extract validation errors from request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If errors, send back validation error messages
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors, save the form data to the database
    const { name, email, tel } = req.body;
    try {
      const newContact = new contactModal({ name, email, tel }); // Contact model ka instance banayein
      await newContact.save(); // Save to MongoDB
      res.json({
        message: "Contact form submitted successfully",
        data: newContact,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Server error while saving data" });
    }
  },
];

// Popup form controller
const popup = [
    // Validate and sanitize fields
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .escape(),
    
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),
    
    body('tel')
      .trim()
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^[0-9\s()-]*$/)  // Update to match any number format (no country code required)
      .withMessage('Invalid phone number'), // Custom error message for invalid phone number
    
    // Process request after validation and sanitization
    async (req, res) => {
      // Extract validation errors from the request
      const errors = validationResult(req);
      
      // If there are validation errors, return them
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Destructure data from the request body
      const { name, email, tel } = req.body;
  
      try {
        // Create a new popup entry
        const newPopup = new popupModal({
          name,
          email,
          tel,
          status: 'pending', // Set initial status as pending
        });
  
        // Save to MongoDB
        await newPopup.save();
  
        // Send response after saving the popup inquiry
        res.json({
          message: 'Popup inquiry submitted successfully',
          data: newPopup,
        });
      } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Server error while saving data' });
      }
    },
  ];

  
module.exports = { contact, popup };

