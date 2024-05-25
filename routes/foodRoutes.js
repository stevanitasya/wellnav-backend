const express = require('express');
const router = express.Router();
const { getFoodsByUserHealthCondition } = require('../services/foodService');
const auth = require('../middleware/auth');

router.get('/recommendations', auth, async (req, res) => {
  try {
    const foods = await getFoodsByUserHealthCondition(req.user.username);
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
