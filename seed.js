const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });

const seedFoods = [
   // Data untuk breakfast - low calories
   //Diabetes
  { name: "Bubur Ayam",
    calories: 150,
    carbohydrates: 25,
    protein: 10,
    fat: 3,
    category: "low calories",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Smoothie", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Gado-Gado Tanpa Lontong", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 12, 
    fat: 8, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Greek Yogurt dengan Berry", 
    calories: 120, 
    carbohydrates: 12, 
    protein: 10, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Smoothie Bayam dan Alpukat", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 5, 
    fat: 10, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Telur Rebus", 
    calories: 70, 
    carbohydrates: 0, 
    protein: 6, 
    fat: 5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Sup Sayuran", 
    calories: 100, 
    carbohydrates: 18, 
    protein: 5, 
    fat: 2, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oatmeal dengan Almond dan Blueberry", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Wafel Gandum Utuh", 
    calories: 157, 
    carbohydrates: 24, 
    protein: 9, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salad Buah", 
    calories: 145, 
    carbohydrates: 14, 
    protein: 1, 
    fat: 11, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tuna Salad dengan Timun", 
    calories: 140, 
    carbohydrates: 2, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Kembang Kol", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk breakfast - Gluten Free
  //Diabetes
  {
    name: "Smoothie Bowl dengan Berries",
    calories: 166,
    carbohydrates: 4.1,
    protein: 17.6,
    fat: 9.2,
    category: "gluten free",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Tahu Orak Arik", 
    calories: 238, 
    carbohydrates: 16.6, 
    protein: 20.5, 
    fat: 11, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Smoothie Jeruk dan Wortel", 
    calories: 150, 
    carbohydrates: 30, 
    protein: 2, 
    fat: 1, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Nasi Jagung dengan Sayuran", 
    calories: 180, 
    carbohydrates: 35, 
    protein: 4, 
    fat: 2, 
    category: "gluten free", 
    mealType: "breakfast, lunch", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oatmeal kembang kol", 
    calories: 139, 
    carbohydrates: 16.3, 
    protein: 6.8, 
    fat: 6.6, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salmon dan Krim Keju", 
    calories: 200, 
    carbohydrates: 10, 
    protein: 15, 
    fat: 15, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Susu Almond dengan Granola Bebas Gluten", 
    calories: 160, 
    carbohydrates: 20, 
    protein: 5, 
    fat: 8, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Protein Shake dengan Buah", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salad Kacang Merah", 
    calories: 157, 
    carbohydrates: 24, 
    protein: 9, 
    fat: 4, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tahu Panggang dengan Sayuran", 
    calories: 120, 
    carbohydrates: 10, 
    protein: 10, 
    fat: 6, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Sop Buntut", 
    calories: 150, 
    carbohydrates: 5, 
    protein: 12, 
    fat: 9, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Ayam Bakar", 
    calories: 160, 
    carbohydrates: 3, 
    protein: 15, 
    fat: 9, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk breakfast - vegan
  //Diabetes
  {
    name: "Smoothie Mangga dan Bayam",
    calories: 150,
    carbohydrates: 30,
    protein: 3,
    fat: 2,
    category: "vegan",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Roti Panggang Alpukat", 
    calories: 160, 
    carbohydrates: 15, 
    protein: 3, 
    fat: 11, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Overnight Oats dengan Kacang dan Buah", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 5, 
    fat: 8, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Chia Pudding dengan Susu Almond", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 5, 
    fat: 10, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Bubur Kacang Hijau", 
    calories: 180, 
    carbohydrates: 35, 
    protein: 8, 
    fat: 1, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Nasi Uduk dengan Tahu dan Tempe", 
    calories: 250, 
    carbohydrates: 35, 
    protein: 10, 
    fat: 8, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Gado-Gado", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 8, 
    fat: 12, 
    category: "vegan, low calories",
    mealType: "breakfast, vegan", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Lontong Sayur", 
    calories: 220, 
    carbohydrates: 30, 
    protein: 6, 
    fat: 8, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tumis Kacang Panjang dan Tempe", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 10, 
    fat: 8, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Urap", 
    calories: 100, 
    carbohydrates: 8, 
    protein: 4, 
    fat: 6, 
    category: "vegan, low calories",
    mealType: "breakfast, lunch", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pisang Rebus", 
    calories: 120, 
    carbohydrates: 30, 
    protein: 1, 
    fat: 0, 
    category: "vegan",
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tumis Labu Siam dan Tahu", 
    calories: 150, 
    carbohydrates: 12, 
    protein: 7, 
    fat: 7, 
    category: "vegan, low calories",
    mealType: "breakfast, lunch", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk lunch - low calories
  //Diabetes
  {
    name: "Sayur Asem",
    calories: 150,
    carbohydrates: 28,
    protein: 4,
    fat: 2,
    category: "low calories",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Pecel", 
    calories: 220, 
    carbohydrates: 22, 
    protein: 8, 
    fat: 12, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Soto Ayam", 
    calories: 250, 
    carbohydrates: 20, 
    protein: 25, 
    fat: 8, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tumis Kangkung", 
    calories: 100, 
    carbohydrates: 10, 
    protein: 3, 
    fat: 5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tahu Goreng", 
    calories: 180, 
    carbohydrates: 10, 
    protein: 12, 
    fat: 10, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Bakwan Sayur", 
    calories: 150, 
    carbohydrates: 15, 
    protein: 4, 
    fat: 8, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Ikan Bakar", 
    calories: 200, 
    carbohydrates: 5, 
    protein: 25, 
    fat: 10, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pepes Tahu", 
    calories: 140, 
    carbohydrates: 10, 
    protein: 10, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Sup Kacang Merah", 
    calories: 180, 
    carbohydrates: 28, 
    protein: 8, 
    fat: 2, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk lunch - Gluten Free
  //Diabetes
  {
    name: "Ayam Panggang Bumbu Rujak",
    calories: 250,
    carbohydrates: 10,
    protein: 20,
    fat: 20,
    category: "gluten free",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Sayur Lodeh", 
    calories: 200, 
    carbohydrates: 18, 
    protein: 6, 
    fat: 10, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oseng Tempe", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 12, 
    fat: 8, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Cap Cay", 
    calories: 160, 
    carbohydrates: 20, 
    protein: 5, 
    fat: 7, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Ikan Pepes", 
    calories: 220, 
    carbohydrates: 5, 
    protein: 22, 
    fat: 12, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tumis Buncis", 
    calories: 100, 
    carbohydrates: 10, 
    protein: 2, 
    fat: 5, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Sate Ayam", 
    calories: 240, 
    carbohydrates: 8, 
    protein: 22, 
    fat: 12, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Sayur Sop", 
    calories: 150, 
    carbohydrates: 20, 
    protein: 5, 
    fat: 3, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Gulai Ikan", 
    calories: 200, 
    carbohydrates: 25, 
    protein: 4, 
    fat: 10, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Terong Balado", 
    calories: 180, 
    carbohydrates: 20, 
    protein: 4, 
    fat: 8, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "", 
    calories: 140, 
    carbohydrates: 2, 
    protein: 20, 
    fat: 6, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "gluten free", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk lunch - vegan
  //Diabetes
  {
    name: "Oatmeal",
    calories: 150,
    carbohydrates: 27,
    protein: 5,
    fat: 3,
    category: "Vegan",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Smoothie", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 5, 
    category: "Vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Omelet Sayuran", 
    calories: 140, 
    carbohydrates: 7, 
    protein: 12, 
    fat: 8, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Greek Yogurt dengan Berry", 
    calories: 120, 
    carbohydrates: 12, 
    protein: 10, 
    fat: 4, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Smoothie Bayam dan Alpukat", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 5, 
    fat: 10, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Telur Rebus dan Avokad", 
    calories: 160, 
    carbohydrates: 2, 
    protein: 6, 
    fat: 14, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Protein", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oatmeal dengan Almond dan Blueberry", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Wafel Gandum Utuh", 
    calories: 157, 
    carbohydrates: 24, 
    protein: 9, 
    fat: 4, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salad Buah", 
    calories: 145, 
    carbohydrates: 14, 
    protein: 1, 
    fat: 11, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tuna Salad dengan Timun", 
    calories: 140, 
    carbohydrates: 2, 
    protein: 20, 
    fat: 6, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Kembang Kol", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "vegan", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk Dinner - low calories
  //Diabetes
  {
    name: "Oatmeal",
    calories: 150,
    carbohydrates: 27,
    protein: 5,
    fat: 3,
    category: "low calories",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Smoothie", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Omelet Sayuran", 
    calories: 140, 
    carbohydrates: 7, 
    protein: 12, 
    fat: 8, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Greek Yogurt dengan Berry", 
    calories: 120, 
    carbohydrates: 12, 
    protein: 10, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Smoothie Bayam dan Alpukat", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 5, 
    fat: 10, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Telur Rebus dan Avokad", 
    calories: 160, 
    carbohydrates: 2, 
    protein: 6, 
    fat: 14, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Protein", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oatmeal dengan Almond dan Blueberry", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Wafel Gandum Utuh", 
    calories: 157, 
    carbohydrates: 24, 
    protein: 9, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salad Buah", 
    calories: 145, 
    carbohydrates: 14, 
    protein: 1, 
    fat: 11, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tuna Salad dengan Timun", 
    calories: 140, 
    carbohydrates: 2, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Kembang Kol", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk Dinner - low calories
  //Diabetes
  {
    name: "Oatmeal",
    calories: 150,
    carbohydrates: 27,
    protein: 5,
    fat: 3,
    category: "low calories",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Smoothie", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Omelet Sayuran", 
    calories: 140, 
    carbohydrates: 7, 
    protein: 12, 
    fat: 8, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Greek Yogurt dengan Berry", 
    calories: 120, 
    carbohydrates: 12, 
    protein: 10, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Smoothie Bayam dan Alpukat", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 5, 
    fat: 10, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Telur Rebus dan Avokad", 
    calories: 160, 
    carbohydrates: 2, 
    protein: 6, 
    fat: 14, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Protein", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oatmeal dengan Almond dan Blueberry", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Wafel Gandum Utuh", 
    calories: 157, 
    carbohydrates: 24, 
    protein: 9, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salad Buah", 
    calories: 145, 
    carbohydrates: 14, 
    protein: 1, 
    fat: 11, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tuna Salad dengan Timun", 
    calories: 140, 
    carbohydrates: 2, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Kembang Kol", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },

  // Data untuk Dinner - low calories
  //Diabetes
  {
    name: "Oatmeal",
    calories: 150,
    carbohydrates: 27,
    protein: 5,
    fat: 3,
    category: "low calories",
    mealType: "breakfast",
    healthConditions: ["Diabetes"]
  },
  { 
    name: "Smoothie", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Omelet Sayuran", 
    calories: 140, 
    carbohydrates: 7, 
    protein: 12, 
    fat: 8, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Greek Yogurt dengan Berry", 
    calories: 120, 
    carbohydrates: 12, 
    protein: 10, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Smoothie Bayam dan Alpukat", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 5, 
    fat: 10, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Telur Rebus dan Avokad", 
    calories: 160, 
    carbohydrates: 2, 
    protein: 6, 
    fat: 14, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Protein", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Oatmeal dengan Almond dan Blueberry", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Wafel Gandum Utuh", 
    calories: 157, 
    carbohydrates: 24, 
    protein: 9, 
    fat: 4, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Salad Buah", 
    calories: 145, 
    carbohydrates: 14, 
    protein: 1, 
    fat: 11, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Tuna Salad dengan Timun", 
    calories: 140, 
    carbohydrates: 2, 
    protein: 20, 
    fat: 6, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },
  { 
    name: "Pancake Kembang Kol", 
    calories: 205, 
    carbohydrates: 19, 
    protein: 24.5, 
    fat: 1.5, 
    category: "low calories", 
    mealType: "breakfast", 
    healthConditions: ["Diabetes"] 
  },  
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
