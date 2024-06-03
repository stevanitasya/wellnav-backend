const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendLoginNotification = require('../config/nodemailer');

// Generate JWT Token
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

// Get user profile
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

// Update user profile
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

// Toggle favorite food
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

// Get favorite foods
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
