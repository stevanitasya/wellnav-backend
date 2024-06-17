const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    name: { type: String, required: true }, 
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    protein: { type: Number, required: true }, 
    fat: { type: Number, required: true },
    category: [{ type: String, enum: ["Rendah Kalori", "Bebas Gluten", "Vegan", "All"] }],
    mealType: [{ type: String, enum: ["Sarapan", "Makan Siang", "Makan Malam"], required: true }]
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
