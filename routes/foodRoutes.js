const express = require('express');
const router = express.Router();
const Food = require('./models/Food'); 

// Add food recommendation
router.post('/add', async (req, res) => {
  try {
    const { category, name, image, details } = req.body;
    const newFood = new Food({ category, name, image, details });
    await newFood.save();
    res.status(201).json({ message: 'Food added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all food recommendations
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
