const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const foodLogRoutes = require('./routes/foodLogRoutes');
const waterTrackingRoutes = require('./routes/waterTrackingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const auth = require('./middleware/auth');
require('./config/passport');
require('dotenv').config();

const app = express();

// Logging environment variable
console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to database
connectDB();

// CORS configuration
const corsOptions = {
  origin: ['https://wellnav-website.vercel.app', 'http://localhost:3000'], // Add your local development URL
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'Public')));

// Logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/foodlogs', foodLogRoutes);
app.use('/api/watertrackings', waterTrackingRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
