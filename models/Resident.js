const mongoose = require('mongoose');

// Model for Residents

const ResidentSchema = new mongoose.Schema({
  resthomeid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'resthome',
  },
  name: {
    type: String,
    required: true,
  },
  nhi: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  bloodtype: {
    type: String,
  },
  bloodpressure: [
    {
      bloodpressure: {
        type: String,
        required: true,
      },
      resthomeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resthome',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  heartrate: [
    {
      heartrate: {
        type: Number,
        required: true,
      },
      resthomeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resthome',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  conditions: [
    {
      name: {
        type: String,
        required: true,
      },
      treatment: {
        type: String,
        required: true,
      },
      resthomeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resthome',
      },
    },
  ],
  notes: [
    {
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      resthomeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resthome',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Resident = mongoose.model('resident', ResidentSchema);
