const mongoose = require('mongoose');

const entrySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    mood: {
      type: String,
      required: [true, 'Please select the mood'],
      enum: ['Good', 'Neutral', 'NotSoGood'],
    },
    title: {
      type: String,
      required: [true, 'Please enter the title'],
    },
    text: {
      type: String,
      required: [true, 'Please enter the text'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Entry', entrySchema);
