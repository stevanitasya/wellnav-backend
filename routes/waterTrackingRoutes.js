const express = require('express');
const router = express.Router();
const WaterTracking = require('../models/WaterTracking');

// Endpoint untuk menambahkan log pelacakan air putih
router.post('/', async (req, res) => {
  try {
    const { userId, amount, date } = req.body;
    const waterTracking = new WaterTracking({ userId, amount, date });
    await waterTracking.save();
    res.status(201).json(waterTracking);
  } catch (error) { 
    res.status(400).json({ error: error.message });
  }
});

// Endpoint untuk mengambil log pelacakan air putih berdasarkan userId
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const waterTrackings = await WaterTracking.find({ userId });
    res.json(waterTrackings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
