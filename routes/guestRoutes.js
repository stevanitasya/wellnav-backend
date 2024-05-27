const express = require('express');
const { getLandingPage, getAboutPage, getFAQPage } = require('../controllers/guestController');
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
router.get('/faq', (req, res, next) => {
  console.log('GET /api/guest/faq');
  next();
}, getFAQPage);

module.exports = router;