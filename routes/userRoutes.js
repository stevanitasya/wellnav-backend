const express = require('express');
const { createUser, loginUser, addFoodConsumption, getDashboardData, getProfile, updateProfile, getFoodRecommendations, filterFoodRecommendations, toggleFavoriteFood, getFavoriteFoods } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', createUser); 
router.post('/login', loginUser); 
router.post('/food', addFoodConsumption);
router.get('/dashboard/:userId', getDashboardData);
router.get('/profile/:userId', getProfile);
router.put('/profile/:userId', updateProfile);
router.get('/recommendations/:userId', getFoodRecommendations);
router.get('/recommendations/filter', filterFoodRecommendations);
router.post('/favorite/:userId/:foodId', toggleFavoriteFood);
router.get('/favorite/:userId', getFavoriteFoods);

module.exports = router;
