const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/wellnav', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Route untuk root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
