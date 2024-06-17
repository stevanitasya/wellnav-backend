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
require('./config/passport');
require('dotenv').config();


const app = express();

// Connect to database
connectDB();
const corsOptions = {
  origin: 'https://your-app.vercel.app',
  optionsSuccessStatus: 200
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'Public')));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
