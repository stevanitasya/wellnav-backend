const express = require('express');
const { addFoodLog, getFoodLogsByDate } = require('../controllers/foodLogController');
const router = express.Router();

router.post('/add', addFoodLog);
router.get('/:userId/:date', getFoodLogsByDate);

module.exports = router;
