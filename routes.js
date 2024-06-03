const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const foodController = require('./controllers/foodController');
const foodLogController = require('./controllers/foodLogController');
const waterController = require('./controllers/waterController');
const notificationController = require('./controllers/notificationController');
const auth = require('./middleware/auth');

// User Routes
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', userController.getProfile);
router.put('/profile/:userId', userController.updateProfile);
router.post('/favorites/:userId/:foodId', userController.toggleFavoriteFood);
router.get('/favorites/:userId', userController.getFavoriteFoods);

// Food Routes
router.get('/foods', foodController.getAllFoods);
router.get('/foods/:id', foodController.getFoodById);
router.get('/foods/search', foodController.searchFoods);
router.get('/foods/category', foodController.filterFoodRecommendations);
router.get('/foods/category-meal', foodController.getFoodsByCategoryAndMealType);

// Routes untuk log air minum
router.post('/water', auth, waterController.addWaterLog);
router.get('/water/today', auth, waterController.getTodayWaterLogs);

// Routes untuk notifikasi
router.post('/notifications', auth, notificationController.addNotification);
router.get('/notifications', auth, notificationController.getNotifications);

module.exports = router;
