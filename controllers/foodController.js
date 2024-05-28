const Food = require('../models/Food');

// Menambah makanan baru
exports.addFood = async (req, res) => {
  try {
    const { name, calories, category, mealType, healthConditions } = req.body;

    const newFood = new Food({
      name,
      calories,
      category,
      mealType,
      healthConditions
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

// Memperbarui makanan
exports.updateFood = async (req, res) => {
  try {
    const { name, calories, category, mealType, healthConditions } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, { name, calories, category, mealType, healthConditions }, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menghapus makanan
exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mengambil makanan berdasarkan kategori dan mealType
exports.getFoodsByCategoryAndMealType = async (req, res) => {
  try {
    const { category, mealType } = req.query;
    const foods = await Food.find({ category, mealType });
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
