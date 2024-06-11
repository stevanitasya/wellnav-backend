const mongoose = require('mongoose');

const waterLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  logs: [
    {
      amount: {
        type: Number,
        required: true,
      },
      time: {
        type: String,
        required: true,
      }
    }
  ]
});

module.exports = mongoose.model('WaterLog', waterLogSchema);
