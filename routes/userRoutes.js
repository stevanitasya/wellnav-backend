const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/dashboard/:userId', userController.getDashboardData);
router.get('/profile/:userId', auth, userController.getProfile);
router.put('/profile/:userId', auth, userController.updateProfile);
router.post('/favorites/:userId/:foodId', auth, userController.toggleFavoriteFood);
router.get('/favorites/:userId', auth, userController.getFavoriteFoods);

module.exports = router;
 