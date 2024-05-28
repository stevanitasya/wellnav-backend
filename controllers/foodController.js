const Food = require('../models/Food');

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
    const { category, mealType } = req.query;
    const query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (mealType) {
      query.mealType = mealType;
    }
    const foods = await Food.find(query);
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
