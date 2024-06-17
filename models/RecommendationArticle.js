const mongoose = require('mongoose');

const recommendationArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    category: [{ type: String, enum: ["Rendah Kalori", "Bebas Gluten", "Vegan", 'all'] }],
    healthConditions: [{ type: String, enum: ['GERD', 'Diabetes', 'Asam Urat', 'Darah tinggi'] }],
    link: [{type: String, required: true }],
    isFavorite: { type: Boolean, default: false }
});
  
const RecommendationArticle = mongoose.model('RecommendationArticle', recommendationArticleSchema);
module.exports = RecommendationArticle;
