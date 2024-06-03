const express = require('express');
const router = express.Router();
const { getAllFoods, getFoodById, searchFoods, filterFoodRecommendations, getFoodsByCategoryAndMealType } = require('../controllers/foodController');


router.get('/foods', getAllFoods);
router.get('/foods/:id', getFoodById);
router.get('/foods/search', searchFoods);
router.get('/foods/category', filterFoodRecommendations);
router.get('/foods/category-meal', getFoodsByCategoryAndMealType);

module.exports = router;
