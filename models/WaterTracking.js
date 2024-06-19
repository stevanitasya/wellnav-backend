const mongoose = require('mongoose');

const waterTrackingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const WaterTracking = mongoose.model('WaterTracking', waterTrackingSchema);

module.exports = WaterTracking;
