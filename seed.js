const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error(err);
});

const seedFoods = [
  {
    name: "Oatmeal",
    calories: 150,
    category: "low calories",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  {
    name: "Grilled Chicken Salad",
    calories: 300,
    category: "low calories",
    mealType: "lunch",
    healthConditions: ["Diabetes", "Darah tinggi"]
  },
  {
    name: "Quinoa Salad",
    calories: 200,
    category: "gluten free",
    mealType: "dinner",
    healthConditions: ["GERD"]
  },
  {
    name: "Avocado Toast",
    calories: 250,
    category: "vegan",
    mealType: "breakfast",
    healthConditions: []
  },
  {
    name: "Lentil Soup",
    calories: 180,
    category: "vegan",
    mealType: "lunch",
    healthConditions: ["GERD", "Asam Urat"]
  },
  {
    name: "Grilled Salmon",
    calories: 400,
    category: "all",
    mealType: "dinner",
    healthConditions: ["Darah tinggi"]
  }
];

const seedDB = async () => {
  await Food.deleteMany({});
  await Food.insertMany(seedFoods);
  console.log('Database seeded with food data');
  mongoose.connection.close();
};

seedDB().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
