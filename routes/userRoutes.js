const express = require('express');
const { createUser, loginUser, addFoodConsumption, getDashboardData } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/food', addFoodConsumption);
router.get('/dashboard/:userId', getDashboardData);

module.exports = router;
