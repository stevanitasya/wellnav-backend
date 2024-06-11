const express = require('express');
const router = express.Router();
const foodLogController = require('../controllers/foodLogController');
const auth = require('../middleware/auth');

router.post('/', auth, foodLogController.addFoodConsumption);
router.get('/today', auth, foodLogController.getTodayFoodLogs);

module.exports = router;
