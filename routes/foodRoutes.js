const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.getAllFoods); // Tidak perlu auth di sini
router.get('/:id', foodController.getFoodById);
router.get('/search', foodController.searchFoods); 
router.get('/category', foodController.getRecomendedFoodByCategory);
router.get('/recommended', foodController.getRecommendedFoods);

module.exports = router;
