const Food = require('../models/Food');
const User = require('../models/User');

// Mengambil semua makanan
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
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
exports.getFoodsByCategoryAndMealType = async (req, res) => {
  try {
    const { category, mealType, userId } = req.query;
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (mealType) {
      query.mealType = mealType;
    }

    const foods = await Food.find(query);
    
    // Menambahkan validasi untuk kondisi kesehatan jika userId disediakan
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        const healthConditions = user.healthCondition;
        const safeFoods = foods.filter(food => 
          !food.healthConditions.some(cond => healthConditions.includes(cond))
        );
        return res.json(safeFoods);
      }
    }

    res.json(foods);
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
