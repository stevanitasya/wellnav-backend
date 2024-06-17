const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const auth = require('../middleware/auth');

router.get('/', foodController.getAllFoods); // Tidak perlu auth di sini
router.get('/:id', foodController.getFoodById);
router.get('/search', foodController.searchFoods); 
router.get('/category', foodController.getRecomendedFoodByCategory);
router.get('/recommended/:userId', foodController.getRecommendedFoods); 

module.exports = router;
