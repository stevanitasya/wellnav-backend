const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendLoginNotification = require('../config/nodemailer');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

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

exports.addFoodConsumption = async (req, res) => {
  try {
    const { userId, date, calories, carbohydrates, protein, fat } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.foodConsumption.push({ date, calories, carbohydrates, protein, fat });
    await user.save();

    res.status(201).json(user.foodConsumption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
