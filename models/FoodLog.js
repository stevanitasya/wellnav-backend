const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  mealType: {
    type: String,
    enum: ['Sarapan', 'Makan Siang', 'Makan Malam'], // Perbaikan untuk enum
    required: true
  },
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true }
});

const FoodLog = mongoose.model('FoodLog', foodLogSchema);
module.exports = FoodLog;
