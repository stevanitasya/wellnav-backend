const express = require('express');
const router = express.Router();
const foodLogController = require('../controllers/foodLogController');
const auth = require('../middleware/auth');

router.post('/', auth, foodLogController.addFoodLog);
router.get('/today', auth, foodLogController.getTodayFoodLogs);

module.exports = router;
