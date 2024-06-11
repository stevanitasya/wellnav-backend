const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

router.post('/', auth, notificationController.addNotification);
router.get('/', auth, notificationController.getNotifications);

module.exports = router;