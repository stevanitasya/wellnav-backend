const User = require('../models/User');
const Food = require('../models/Food');  // Import model Food 
const jwt = require('jsonwebtoken');
const sendLoginNotification = require('../config/nodemailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Sign up
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, age, healthCondition } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = new User({ username, email, password, age, healthCondition });
    await user.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      age: user.age,
      healthCondition: user.healthCondition,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      sendLoginNotification(user.email); // Kirim notifikasi email saat login berhasil
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        age: user.age,
        healthCondition: user.healthCondition,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fungsi untuk mendapatkan profil pengguna
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fungsi untuk memperbarui profil pengguna
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, age, healthCondition } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.age = age || user.age;
    user.healthCondition = healthCondition || user.healthCondition;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      age: updatedUser.age,
      healthCondition: updatedUser.healthCondition
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Dashboard
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const latestConsumption = user.foodConsumption.slice(-1)[0] || {
      date: null,
      calories: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0
    };

    res.json({
      dailyCalories: latestConsumption.calories,
      waterReminder: "Remember to drink 8 glasses of water today!",
      nutritionTracking: {
        carbohydrates: latestConsumption.carbohydrates,
        protein: latestConsumption.protein,
        fat: latestConsumption.fat
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pelacakan nutrisi
exports.addFoodConsumption = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { mealType, foodIds } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const foods = await Food.find({ _id: { $in: foodIds } });
    const healthConditions = user.healthCondition;

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let isFoodSafe = true;

    foods.forEach(food => {
      totalCalories += food.calories;
      totalCarbs += food.carbohydrates;
      totalProtein += food.protein;
      totalFat += food.fat;

      if (food.healthConditions.some(cond => healthConditions.includes(cond))) {
        isFoodSafe = false;
      }
    });

    if (!isFoodSafe) {
      return res.status(400).json({ error: "The food you eat is not good for your current health condition" });
    }

    const today = new Date().toISOString().split('T')[0];
    let dailyConsumption = user.foodConsumption.find(fc => fc.date.toISOString().split('T')[0] === today && fc.mealType === mealType);

    if (dailyConsumption) {
      dailyConsumption.foods = [...dailyConsumption.foods, ...foodIds];
      dailyConsumption.calories += totalCalories;
      dailyConsumption.carbohydrates += totalCarbs;
      dailyConsumption.protein += totalProtein;
      dailyConsumption.fat += totalFat;
    } else {
      user.foodConsumption.push({
        date: new Date(),
        mealType,
        foods: foodIds,
        calories: totalCalories,
        carbohydrates: totalCarbs,
        protein: totalProtein,
        fat: totalFat
      });
    }

    await user.save();
    res.json(user.foodConsumption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pelacakan nutrisi
exports.getFoodConsumption = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('foodConsumption.foods');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const today = new Date().toISOString().split('T')[0];
    const dailyConsumption = user.foodConsumption.filter(fc => fc.date.toISOString().split('T')[0] === today);

    res.json(dailyConsumption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Rekomendasi makanan berdasarkan kondisi kesehatan
exports.getRecommendedFoods = async (req, res) => {
  try {
    const { userId, filter } = req.params;

    let query = {};
    switch (filter) {
      case 'lowcalories':
        query.calories = { $lt: 100 };
        break;
      case 'glutenfree':
        query.glutenFree = true;
        break;
      case 'vegan':
        query.vegan = true;
        break;
      case 'favorite':
        const user = await User.findById(userId).populate('favoriteFoods');
        return res.json(user.favoriteFoods);
      default:
        // Menampilkan semua makanan
    }

    const recommendedFoods = await Food.find(query);
    res.json(recommendedFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Pencarian makanan
exports.searchFoods = async (req, res) => {
  try {
    const { query } = req.query;
    const foods = await Food.find({ name: { $regex: query, $options: 'i' } });
    res.json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Filter makanan rekomendasi
exports.filterFoodRecommendations = async (req, res) => {
  try {
    const { category } = req.query;
    const filteredFoods = await Food.find({ category });
    res.json(filteredFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menandai makanan sebagai favorit
exports.toggleFavoriteFood = async (req, res) => {
  try {
    const userId = req.params.userId;
    const foodId = req.params.foodId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.favoriteFoods.includes(foodId)) {
      user.favoriteFoods = user.favoriteFoods.filter(id => id.toString() !== foodId);
    } else {
      user.favoriteFoods.push(foodId);
    }

    await user.save();
    res.json(user.favoriteFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan makanan favorit
exports.getFavoriteFoods = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('favoriteFoods');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.favoriteFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
