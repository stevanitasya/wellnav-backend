const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Food = require('../models/Food');

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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Login failed! Check authentication credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', { expiresIn: '7d' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
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