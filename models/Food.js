const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  details: {
    kcal: { type: Number },
    carbs: { type: Number },
    protein: { type: Number },
    fat: { type: Number }
  },
  healthConditions: [{ type: String, enum: ['GERD', 'Diabetes', 'Asam Urat', 'Darah tinggi'] }]
});

module.exports = mongoose.model('Food', FoodSchema);
