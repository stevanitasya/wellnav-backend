const express = require('express');
const { addFood, getAllFoods, getFoodById, updateFood, deleteFood, getFoodsByCategoryAndMealType } = require('../controllers/foodController');
const router = express.Router();

router.post('/', addFood);
router.get('/', getAllFoods);
router.get('/:id', getFoodById);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);
router.get('/filter', getFoodsByCategoryAndMealType);

module.exports = router;
