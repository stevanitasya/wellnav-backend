const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendVerificationEmail = require('../config/nodemailer');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Sign up
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, age, healthCondition } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const user = new User({ username, email, password, age, healthCondition });

    const token = crypto.randomBytes(20).toString('hex');
    user.emailToken = token;
    user.isVerified = false;

    await user.save();

    const verifyUrl = `http://localhost:5001/api/users/verify-email?token=${token}`;
    sendVerificationEmail(user.email, verifyUrl);

    res.status(201).json({ message: 'User registered, please check your email to verify your account.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Token tidak valid atau token telah kadaluarsa.' });
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Menghapus token setelah verifikasi
    await user.save();

    res.status(200).json({ message: 'Email berhasil diverifikasi.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt with username:', username);

    const user = await User.findOne({ username });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    if (!user.isVerified) {
      console.log('Email not verified');
      return res.status(400).json({ error: 'Please verify your email first' });
    }

    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, message: "Login berhasil" });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.query.userid;
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
      nutritionSummary: {
        carbohydrates: latestConsumption.carbohydrates,
        protein: latestConsumption.protein,
        fat: latestConsumption.fat
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRecommendedFoods = async (req, res) => {
  try {
    const userId = req.user._id; // Make sure user is authenticated and user object is available
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const healthConditions = user.healthCondition;
    const recommendedArticles = await RecommendationArticle.find({
      healthConditions: { $in: healthConditions }
    });

    res.json({
      articles: recommendedArticles
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
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
    const userId = req.user._id;
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
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Toggle favorite food
exports.toggleFavoriteFood = async (req, res) => {
  try {
    const userId = req.user._id;
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
    const userId = req.user._id;
    const user = await User.findById(userId).populate('favoriteFoods');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.favoriteFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};