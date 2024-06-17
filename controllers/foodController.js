const Food = require('../models/Food');
const RecommendationArticle = require('../models/RecommendationArticle');
const User = require('../models/User');

// controllers/foodController.js
exports.getAllFoods = async (req, res) => {
  try {
    const { category, mealType } = req.query;
    let query = {};

    if (category && category !== "All") {
      query.category = { $in: [category] };
    }

    if (mealType && mealType !== "All") {
      query.mealType = { $in: [mealType] };
    }

    const foods = await Food.find(query);
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mengambil makanan berdasarkan ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mengambil makanan berdasarkan kategori dan mealType
exports.getRecomendedFoodByCategory = async (req, res) => { 
  try {
    const { category, userId } = req.query;
    const query = {};
    if (category && category !== "All") {
      Food = Food.filter(food => food.category.includes(category));
    }
    const recommendationarticles = await recommendationarticles.find(query);
    
    // Menambahkan validasi untuk kondisi kesehatan jika userId disediakan
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        const healthConditions = user.healthCondition;
        const safeFoods = Food.filter(food => 
          !food.healthConditions.some(cond => healthConditions.includes(cond))
        );
        return res.json(safeFoods);
      }
    } 

    res.json(recommendationarticles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fungsi untuk mencari makanan
exports.searchFoods = async (req, res) => {
  try {
    const { query } = req.query;
    const foods = await Food.find({ name: { $regex: query, $options: 'i' } });
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan makanan yang direkomendasikan berdasarkan kondisi kesehatan pengguna
exports.getRecommendedFoods = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const healthConditions = user.healthCondition;
    const recommendedFoods = await Food.find({
      healthConditions: { $in: healthConditions }
    });
    
    const recommendedArticles = await RecommendationArticle.find({
      healthConditions: { $in: healthConditions }
    });

    res.json({
      foods: recommendedFoods,
      articles: recommendedArticles
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fungsi untuk memfilter makanan berdasarkan kategori
exports.filterFoodRecommendations = async (req, res) => {
  try {
    const { category } = req.query;
    const filteredFoods = await Food.find({ category });
    res.json(filteredFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
