const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
//const foodLogController = require('../controllers/foodLogController');

const auth = require('../middleware/auth');

router.get('/', foodController.getAllFoods);
router.get('/:id', auth, foodController.getFoodById);
router.get('/search', auth, foodController.searchFoods); 
router.get('/category', auth, foodController.getRecomendedFoodByCategory);
router.get('/recommended/:userId', auth, foodController.getRecommendedFoods);
// router.post('/foodlog', foodLogController.addFoodLog);
// router.get('/foodlog/:date', foodLogController.getFoodLogsByDate);

module.exports = router;


module.exports = router;
