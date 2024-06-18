const express = require('express');
const { addFoodLog, getFoodLogsByDate } = require('../controllers/foodLogController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add', auth, addFoodLog);
router.get('/:date', auth, getFoodLogsByDate);

module.exports = router;
