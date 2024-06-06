const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/auth');

router.post('/notifications', auth, notificationController.addNotification);
router.get('/notifications', auth, notificationController.getNotifications);

module.exports = router;