const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const auth = require('../middleware/auth');

router.get('/', auth, foodController.getAllFoods);
router.get('/:id', auth, foodController.getFoodById);
router.get('/search', auth, foodController.searchFoods);
router.get('/category', auth, foodController.getRecomendedFoodByCategoryAndMealType);
router.get('/recommended/:userId', auth, foodController.getRecommendedFoods);

module.exports = router;
