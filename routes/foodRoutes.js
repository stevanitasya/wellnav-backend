const express = require('express');
const { getAllFoods, getFoodById, getFoodsByCategoryAndMealType } = require('../controllers/foodController');
const router = express.Router();

router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.get('/filter', getFoodsByCategoryAndMealType);
module.exports = router;
