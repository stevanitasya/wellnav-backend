const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Route untuk Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, age, healthCondition } = req.body;
    const newUser = new User({ username, password, email, age, healthCondition });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route untuk Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route untuk GET semua pengguna (opsional)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
