const express = require('express');
const { addFoodLog, getFoodLogsByDate } = require('../controllers/foodLogController');
const router = express.Router();

router.post('/foodlog/:userId', addFoodLog);
router.get('/foodlog/:userId', getFoodLogsByDate);

module.exports = router;
