const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/dashboard', auth, userController.getDashboardData);
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.post('/favorites/:foodId', auth, userController.toggleFavoriteFood);
router.get('/favorites', auth, userController.getFavoriteFoods);

module.exports = router;
