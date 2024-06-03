const express = require('express');
const { createUser, loginUser,getProfile, updateProfile, toggleFavoriteFood, getFavoriteFoods } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/profile/:userId', getProfile);
router.put('/profile/:userId', updateProfile);
router.post('/favorites/:userId/:foodId', toggleFavoriteFood);
router.get('/favorites/:userId', getFavoriteFoods);
module.exports = router;
