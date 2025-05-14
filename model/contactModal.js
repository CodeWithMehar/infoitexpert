const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  tel: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\+?[0-9\s()-]*$/.test(v); // Allows optional +, numbers, spaces, parentheses, and hyphens
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
