const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/recommended', foodController.getRecommendedFoods); // Define this route first
router.get('/search', foodController.searchFoods);
router.get('/category', foodController.getRecomendedFoodByCategory);
router.get('/:id', foodController.getFoodById); // Define this route last
router.get('/', foodController.getAllFoods);

module.exports = router;