const mongoose = require('mongoose');

const popupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email regex
      },
      message: 'Invalid email address',
    },
  },
  tel: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9\s()-]*$/.test(v); // Allows digits, spaces, parentheses, and dashes
      },
      message: 'Invalid phone number', // Custom error message
    },
  },
  status: {
    type: String,
    enum: ['submitted', 'pending', 'error'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Popup', popupSchema);
