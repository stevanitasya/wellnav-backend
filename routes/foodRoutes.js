const express = require('express');
const router = express.Router();
const { getAllFoods, getFoodById, getFoodsByCategoryAndMealType } = require('../controllers/foodController');

router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.get('/filter', getFoodsByCategoryAndMealType);

module.exports = router;
