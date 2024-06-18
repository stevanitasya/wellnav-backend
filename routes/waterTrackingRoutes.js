const express = require('express');
const router = express.Router();
const waterController = require('../controllers/waterController');
const auth = require('../middleware/auth');

router.post('/', auth, waterController.addWaterLog);
router.get('/today', auth, waterController.getTodayWaterLogs);

module.exports = router;
