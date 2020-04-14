const mongoose = require('mongoose');

// Create the Model Structure for Resthomes

const ResthomeSchema = new mongoose.Schema({
  company: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Resthome = mongoose.model('resthome', ResthomeSchema);
