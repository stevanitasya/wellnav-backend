const express = require('express');
const { getLandingPage, getAboutPage } = require('../controllers/guestController');
const auth = require('../middleware/auth'); // Middleware otentikasi

const router = express.Router();

router.get('/landing', (req, res, next) => {
  console.log('GET /api/guest/landing');
  next();
}, getLandingPage);
router.get('/about', (req, res, next) => {
  console.log('GET /api/guest/about');
  next();
}, getAboutPage);

module.exports = router;