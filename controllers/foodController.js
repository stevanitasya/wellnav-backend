const Food = require('../models/Food');
const RecommendationArticle = require('../models/RecommendationArticle');
const User = require('../models/User');

// controllers/foodController.js
exports.getAllFoods = async (req, res) => {
  try {
    console.log('Received request for /api/foods');
    const { category, mealType } = req.query;
    console.log('Query parameters:', { category, mealType });

    let query = {};

    if (category && category !== "All") {
      query.category = { $in: [category] };
    }

    if (mealType && mealType !== "All") {
      query.mealType = { $in: [mealType] };
    }

    console.log('Query:', query);

    const start = Date.now();
    const foods = await Food.find(query).lean().exec(); // Using lean() for faster query
    const end = Date.now();

    console.log('Fetched foods:', foods);
    console.log('Time taken:', end - start, 'ms');

    res.json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error.message);
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
    const userId = req.user._id; // Get userId from authenticated user
    const date = req.query.date || new Date().toISOString().split('T')[0]; // Use current date if not provided
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const foodLogs = await FoodLog.find({
      userId,
      date: {
        $gte: startDate,
        $lt: endDate
      }
    }).populate('foodId');

    // Filter out logs with null foodId
    const validFoodLogs = foodLogs.filter(log => log.foodId);

    const nutritionSummary = validFoodLogs.reduce((acc, log) => {
      acc.calories += log.foodId.calories || 0;
      acc.carbohydrates += log.foodId.carbohydrates || 0;
      acc.protein += log.foodId.protein || 0;
      acc.fat += log.foodId.fat || 0;
      return acc;
    }, { calories: 0, carbohydrates: 0, protein: 0, fat: 0 });

    res.json({ foodLogs: validFoodLogs, nutritionSummary });
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
    const userId = req.user ? req.user.id : req.query.userId; // Accept userId as a query parameter if unauthenticated

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const healthConditions = user.healthCondition;
    const recommendedArticles = await RecommendationArticle.find({
      healthConditions: { $in: healthConditions }
    });

    res.json({ articles: recommendedArticles });
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
