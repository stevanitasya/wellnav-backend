const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/dashboard/:userId', userController.getDashboardData);
router.get('/profile/:userId',  userController.getProfile);
router.put('/profile/:userId',  userController.updateProfile);
router.post('/favorites/:userId/:foodId',  userController.toggleFavoriteFood);
router.get('/favorites/:userId',  userController.getFavoriteFoods);

module.exports = router;
 