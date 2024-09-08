const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendVerificationEmail = require('../config/nodemailer');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};
// Sign up
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, age, healthCondition } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (age < 12) {
      return res.status(400).json({ error: 'You must be at least 12 years old to register.' });
    }

    if (healthCondition.toLowerCase() === 'tidak ada') {
      return res.status(400).json({ error: 'You must have a health condition to register.' });
    }

    const user = new User({
      username,
      email,
      password,
      age,
      healthCondition,
      isVerified: false,
    });

    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;

    await user.save();

    await sendVerificationEmail(user, token);

    res.status(201).json({ message: 'User registered, please check your email to verify your account.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Email verification
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    const vercelUrlFE = process.env.VERCEL_URLFRONTEND || 'http://localhost:3000/sign-in'
    const jwtToken = generateToken(user._id);
    user.tokens = user.tokens.concat({ token: jwtToken });
    await user.save();

    res.redirect(`${vercelUrlFE}?verified=true`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    if (!user.isVerified) {
      console.log('User not verified');
      return res.status(400).json({ error: 'Please verify your email first' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = generateToken(user._id);
    console.log('Generated Token:', token);

    user.tokens = user.tokens.concat({ token });
    console.log('Tokens Before Save:', user.tokens);

    await user.save();

    console.log('Tokens After Save:', user.tokens);
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
    const userId = req.user._id;  // Ambil ID user dari token atau session
    const { username, email, age, healthCondition } = req.body;  // Data yang akan di-update

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        age,
        healthCondition
      },
      { new: true, runValidators: true }  
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      age: updatedUser.age,
      healthCondition: updatedUser.healthCondition,
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