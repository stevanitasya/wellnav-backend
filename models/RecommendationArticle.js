const mongoose = require('mongoose');

const recommendationArticleSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, enum: ['low calories', 'gluten free', 'vegan', 'all'], default: 'all'},
    healthConditions: [{ type: String, enum: ['GERD', 'Diabetes', 'Asam Urat', 'Darah tinggi'] }],
});
  
const RecommendationArticle = mongoose.model('RecommendationArticle', recommendationArticleSchema);
module.exports = RecommendationArticle;
