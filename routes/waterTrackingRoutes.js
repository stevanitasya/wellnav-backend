const express = require('express');
const router = express.Router();
const waterTrackingController = require('../controllers/waterTrackingController');
const auth = require('../middleware/auth');

router.post('/', auth, waterTrackingController.addWaterLog);
router.get('/today', auth, waterTrackingController.getTodayWaterLogs);

module.exports = router;
