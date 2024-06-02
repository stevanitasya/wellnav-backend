const recommendationArticleSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    // Tambahkan field lain yang diperlukan
});
  
const RecommendationArticle = mongoose.model('RecommendationArticle', recommendationArticleSchema);
module.exports = RecommendationArticle;