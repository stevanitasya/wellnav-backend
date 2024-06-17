const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  date: { type: Date, default: Date.now },
  mealType: { type: String, enum: ['Sarapan', 'Makan Siang', 'Makan Malam'], required: true },
});

const FoodLog = mongoose.model('FoodLog', foodLogSchema); 
module.exports = FoodLog;
