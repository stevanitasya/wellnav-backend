const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  category: { type: String, enum: ['low calories', 'gluten free', 'vegan', 'all'], default: 'all'},
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;