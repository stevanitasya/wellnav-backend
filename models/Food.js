const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  category: {
    type: String,
    enum: ['low calories', 'gluten free', 'vegan', 'all'],
    default: 'all'
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true
  },
  healthConditions: [{ type: String, enum: ['GERD', 'Diabetes', 'Asam Urat', 'Darah tinggi'] }],
  isFavorite: { type: Boolean, default: false }
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
