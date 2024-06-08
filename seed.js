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
   // Diabetes - sarapan, makan siang, makan malam
   //low calories
   { imageUrl: "./images/Oatmeal.jpg", name: "Oatmeal", calories: 150, carbohydrates: 27, protein: 5, fat: 3, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/SmoothieAlpukat.jpg", name: "Smoothie Alpukat", calories: 180, carbohydrates: 30, protein: 3, fat: 10, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/SaladBuah.jpg", name: "Salad Buah", calories: 120, carbohydrates: 20, protein: 2, fat: 1, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/OmeletteSayuran.jpg", name: "Omelette Sayuran", calories: 200, carbohydrates: 6, protein: 12, fat: 15, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/GreekYogurtBuah.jpg", name: "Greek Yogurt dengan Buah", calories: 120, carbohydrates: 15, protein: 10, fat: 3, category: "low calories", mealType: "sarapan"},
   //{ imageUrl: "./images/.jpg", name: "Smoothie Bayam dan Pisang", calories: 130, carbohydrates: 25, protein: 2, fat: 2, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/BuburJagung.jpg", name: "Bubur Jagung", calories: 150, carbohydrates: 28, protein: 3, fat: 2, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/TelurRebus.jpg", name: "Telur Rebus", calories: 70, carbohydrates: 1, protein: 6, fat: 5, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/ChiaSeedPudding.jpg", name: "Chia Seed Pudding", calories: 140, carbohydrates: 12, protein: 4, fat: 9, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/AvocadoToast.jpg", name: "Avocado Toast", calories: 160, carbohydrates: 18, protein: 4, fat: 9, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/GreenSmoothie.jpg", name: "Green Smoothie", calories: 110, carbohydrates: 22, protein: 2, fat: 1, category: "low calories", mealType: "sarapan"},
   { imageUrl: "./images/TomatoandCucumberSalad.jpg", name: "Tomato and Cucumber Salad", calories: 90, carbohydrates: 10, protein: 2, fat: 5, category: "low calories", mealType: "sarapan"},

   { imageUrl: "./images/SaladAyam.jpg", name: "Salad Ayam", calories: 300, carbohydrates: 10, protein: 30, fat: 15, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/SupSayuran.jpg", name: "Sup Sayuran", calories: 150, carbohydrates: 25, protein: 5, fat: 5, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/IkanBakar.jpg", name: "Ikan Bakar", calories: 350, carbohydrates: 5, protein: 40, fat: 15, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/GadoGado.jpg", name: "Gado-Gado", calories: 300, carbohydrates: 28, protein: 12, fat: 18, category: "low calories", mealType: "makan siang"},
   //{ imageUrl: "./images/.jpg", name: "Sayur Asem", calories: 150, carbohydrates: 28, protein: 4, fat: 2, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/UrapSayur.jpg", name: "Urap Sayuran", calories: 180, carbohydrates: 20, protein: 5, fat: 8, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/TumisKangkung.jpg", name: "Tumis Kangkung", calories: 100, carbohydrates: 10, protein: 3, fat: 5, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/PepesTahu.jpg", name: "Pepes Tahu", calories: 140, carbohydrates: 10, protein: 10, fat: 6, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/Pecel.jpg", name: "Pecel", calories: 220, carbohydrates: 22, protein: 8, fat: 12, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/SotoAyama.jpg", name: "Soto Ayam", calories: 200, carbohydrates: 12, protein: 18, fat: 8, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/AyamPanggangRujak.jpg", name: "Ayam Panggang Bumbu Rujak", calories: 250, carbohydrates: 10, protein: 20, fat: 15, category: "low calories", mealType: "makan siang"},
   { imageUrl: "./images/OsengTempe.jpg", name: "Oseng Tempe", calories: 180, carbohydrates: 15, protein: 12, fat: 8, category: "low calories", mealType: "makan siang"},

   { imageUrl: "./images/Oatmeal.jpg", name: "Salmon Panggang", calories: 400, carbohydrates: 0, protein: 40, fat: 25, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Brokoli", calories: 180, carbohydrates: 15, protein: 5, fat: 10, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Rebus", calories: 300, carbohydrates: 5, protein: 35, fat: 15, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Capcay Kuah", calories: 200, carbohydrates: 18, protein: 10, fat: 8, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sup Ayam", calories: 250, carbohydrates: 10, protein: 25, fat: 12, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tahu Kukus", calories: 150, carbohydrates: 10, protein: 12, fat: 6, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sop Buntut (tanpa nasi)", calories: 300, carbohydrates: 12, protein: 25, fat: 18, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Udang Panggang", calories: 220, carbohydrates: 5, protein: 30, fat: 10, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Lodeh (tanpa nasi)", calories: 180, carbohydrates: 20, protein: 8, fat: 8, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Pindang Patin", calories: 250, carbohydrates: 8, protein: 20, fat: 14, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Sawi Putih", calories: 100, carbohydrates: 10, protein: 3, fat: 5, category: "low calories", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Gulai Kambing (tanpa nasi)", calories: 350, carbohydrates: 10, protein: 30, fat: 20, category: "low calories", mealType: "makan malam"},
   
   //gluten free
   { imageUrl: "./images/Oatmeal.jpg", name: "Sereal Bebas Gluten", calories: 200, carbohydrates: 40, protein: 5, fat: 2, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Telur Orak-arik", calories: 90, carbohydrates: 1, protein: 7, fat: 6, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Bubur Ayam", calories: 250, carbohydrates: 30, protein: 15, fat: 10, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Pancake Pisang", calories: 150, carbohydrates: 30, protein: 5, fat: 2, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Bowl", calories: 180, carbohydrates: 35, protein: 6, fat: 4, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Kue Beras", calories: 120, carbohydrates: 25, protein: 2, fat: 2, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Granola Bebas Gluten", calories: 220, carbohydrates: 30, protein: 7, fat: 8, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sop Kacang Hijau", calories: 190, carbohydrates: 35, protein: 8, fat: 3, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Telur Rebus dengan Alpukat", calories: 160, carbohydrates: 4, protein: 10, fat: 12, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Ketoprak", calories: 250, carbohydrates: 35, protein: 10, fat: 8, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Salad Buah", calories: 120, carbohydrates: 20, protein: 2, fat: 1, category: "gluten free", mealType: "sarapan"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Yogurt dengan Madu", calories: 100, carbohydrates: 18, protein: 5, fat: 2, category: "gluten free", mealType: "sarapan"},

   { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Merah dengan Tahu", calories: 400, carbohydrates: 60, protein: 15, fat: 10, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Capcay", calories: 250, carbohydrates: 30, protein: 10, fat: 8, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sop Buntut", calories: 500, carbohydrates: 40, protein: 35, fat: 20, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Gulai Ikan", calories: 350, carbohydrates: 10, protein: 30, fat: 18, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sate Ayam", calories: 300, carbohydrates: 10, protein: 25, fat: 15, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Lodeh Sayur", calories: 280, carbohydrates: 25, protein: 8, fat: 15, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Pepes Ikan", calories: 250, carbohydrates: 5, protein: 28, fat: 12, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sop Iga", calories: 450, carbohydrates: 30, protein: 35, fat: 20, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Jamur", calories: 200, carbohydrates: 15, protein: 10, fat: 8, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Taliwang", calories: 320, carbohydrates: 8, protein: 28, fat: 18, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Bening", calories: 150, carbohydrates: 15, protein: 5, fat: 6, category: "gluten free", mealType: "makan siang"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tempe Bacem", calories: 270, carbohydrates: 20, protein: 15, fat: 10, category: "gluten free", mealType: "makan siang"},
  
   { imageUrl: "./images/Oatmeal.jpg", name: "Sate Ayam", calories: 350, carbohydrates: 20, protein: 30, fat: 20, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Kukus", calories: 250, carbohydrates: 5, protein: 35, fat: 10, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Pepes Ikan", calories: 300, carbohydrates: 10, protein: 40, fat: 15, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Bakar", calories: 280, carbohydrates: 5, protein: 25, fat: 15, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Bayam", calories: 120, carbohydrates: 10, protein: 5, fat: 6, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sup Jamur", calories: 200, carbohydrates: 15, protein: 10, fat: 8, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Telur Dadar", calories: 180, carbohydrates: 2, protein: 12, fat: 14, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Gado-Gado", calories: 250, carbohydrates: 20, protein: 10, fat: 15, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Labu Siam", calories: 140, carbohydrates: 10, protein: 3, fat: 8, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Asem", calories: 150, carbohydrates: 15, protein: 5, fat: 4, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Oseng Tempe", calories: 200, carbohydrates: 12, protein: 12, fat: 10, category: "gluten free", mealType: "makan malam"},
   { imageUrl: "./images/Oatmeal.jpg", name: "Sup Kacang Merah", calories: 250, carbohydrates: 30, protein: 12, fat: 8, category: "gluten free", mealType: "makan malam"},
   
    //vegan
    { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum Panggang", calories: 180, carbohydrates: 30, protein: 5, fat: 6, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Pisang dan Bayam", calories: 200, carbohydrates: 35, protein: 3, fat: 2, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Bubur Kacang Hijau", calories: 220, carbohydrates: 40, protein: 10, fat: 5, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Oatmeal dengan Buah-buahan", calories: 250, carbohydrates: 45, protein: 7, fat: 4, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum Tawar", calories: 150, carbohydrates: 25, protein: 4, fat: 3, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sereal Kaya Serat", calories: 180, carbohydrates: 35, protein: 5, fat: 2, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Yogurt Plain", calories: 120, carbohydrates: 15, protein: 8, fat: 2, category: "vegetarian", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Pancake Gandum", calories: 200, carbohydrates: 30, protein: 5, fat: 6, category: "vegetarian", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Kacang Almond Panggang", calories: 160, carbohydrates: 8, protein: 6, fat: 14, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Jeruk Navel", calories: 80, carbohydrates: 20, protein: 1, fat: 0, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Susu Kedelai Dingin", calories: 100, carbohydrates: 10, protein: 7, fat: 4, category: "vegan", mealType: "sarapan"},

    { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Goreng Vegan", calories: 350, carbohydrates: 50, protein: 10, fat: 10, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Gado-gado", calories: 300, carbohydrates: 40, protein: 15, fat: 15, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Asem", calories: 150, carbohydrates: 20, protein: 5, fat: 5, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Merah dengan Tumis Sayuran", calories: 300, carbohydrates: 50, protein: 8, fat: 5, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Panggang dengan Kentang Panggang", calories: 350, carbohydrates: 25, protein: 30, fat: 15, category: "non-vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salad Buah-buahan Segar", calories: 200, carbohydrates: 45, protein: 3, fat: 1, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sandwich Gandum dengan Keju dan Sayuran", calories: 280, carbohydrates: 30, protein: 10, fat: 12, category: "vegetarian", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sup Kubis dengan Tahu dan Jamur", calories: 220, carbohydrates: 15, protein: 12, fat: 8, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Mie Soba dengan Sayuran dan Tofu", calories: 320, carbohydrates: 40, protein: 15, fat: 10, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Quinoa Salad dengan Alpukat dan Tomat", calories: 280, carbohydrates: 30, protein: 6, fat: 15, category: "vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Salmon Panggang dengan Brokoli", calories: 300, carbohydrates: 10, protein: 25, fat: 20, category: "non-vegan", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tahu Goreng dengan Sambal Matah", calories: 250, carbohydrates: 5, protein: 15, fat: 18, category: "vegan", mealType: "makan siang"},

    { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Lodeh", calories: 350, carbohydrates: 40, protein: 15, fat: 15, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tempe", calories: 250, carbohydrates: 30, protein: 20, fat: 10, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Karedok", calories: 200, carbohydrates: 20, protein: 10, fat: 10, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tahu dengan Brokoli", calories: 250, carbohydrates: 10, protein: 15, fat: 12, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salmon Panggang dengan Asparagus", calories: 300, carbohydrates: 8, protein: 30, fat: 18, category: "non-vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Quinoa dengan Sayuran Panggang", calories: 280, carbohydrates: 35, protein: 10, fat: 8, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sup Sayuran dengan Kubis dan Wortel", calories: 200, carbohydrates: 25, protein: 5, fat: 4, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Dada Ayam Panggang dengan Salad", calories: 320, carbohydrates: 15, protein: 25, fat: 10, category: "non-vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Buncis dengan Tofu", calories: 220, carbohydrates: 12, protein: 14, fat: 9, category: "vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Merah dengan Ayam Goreng Tanpa Kulit", calories: 350, carbohydrates: 40, protein: 20, fat: 12, category: "non-vegan", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum dengan Keju dan Selai", calories: 280, carbohydrates: 30, protein: 12, fat: 10, category: "vegetarian", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sayuran Panggang dengan Saus Kacang", calories: 230, carbohydrates: 20, protein: 8, fat: 14, category: "vegan", mealType: "makan malam"},

    // GERD - sarapan, makan siang, makan malam
    //low calories
    { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Pisang", calories: 150, carbohydrates: 30, protein: 2, fat: 1, category: "low calories", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Oatmeal dengan Buah", calories: 180, carbohydrates: 35, protein: 5, fat: 3, category: "low calories", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salad Sayur", calories: 120, carbohydrates: 20, protein: 3, fat: 2, category: "low calories", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Oatmeal dengan Buah-buahan", calories: 250, carbohydrates: 45, protein: 7, fat: 4, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum Tawar", calories: 150, carbohydrates: 25, protein: 4, fat: 3, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sereal Kaya Serat", calories: 180, carbohydrates: 35, protein: 5, fat: 2, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Yogurt Plain", calories: 120, carbohydrates: 15, protein: 8, fat: 2, category: "vegetarian", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Pancake Gandum", calories: 200, carbohydrates: 30, protein: 5, fat: 6, category: "vegetarian", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Kacang Almond Panggang", calories: 160, carbohydrates: 8, protein: 6, fat: 14, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Jeruk Navel", calories: 80, carbohydrates: 20, protein: 1, fat: 0, category: "vegan", mealType: "sarapan"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Susu Kedelai Dingin", calories: 100, carbohydrates: 10, protein: 7, fat: 4, category: "vegan", mealType: "sarapan"},

    { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Panggang", calories: 300, carbohydrates: 10, protein: 35, fat: 10, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salad Sayuran dengan Ayam", calories: 200, carbohydrates: 25, protein: 20, fat: 8, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sup Ayam", calories: 180, carbohydrates: 15, protein: 20, fat: 8, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Wrap Sayuran dengan Hummus", calories: 250, carbohydrates: 30, protein: 8, fat: 10, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salad Kacang-kacangan dengan Dressing Lemon", calories: 280, carbohydrates: 20, protein: 12, fat: 15, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Sayuran dengan Tahu", calories: 230, carbohydrates: 15, protein: 10, fat: 8, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Quinoa Salad dengan Sayuran Segar", calories: 270, carbohydrates: 35, protein: 8, fat: 10, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sandwich Sayuran dengan Keju Rendah Lemak", calories: 290, carbohydrates: 25, protein: 12, fat: 14, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sup Kubis dengan Kentang", calories: 220, carbohydrates: 20, protein: 6, fat: 8, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Mie Soba dengan Sayuran Panggang", calories: 270, carbohydrates: 30, protein: 9, fat: 12, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Buncis dengan Tempeh", calories: 240, carbohydrates: 20, protein: 14, fat: 10, category: "low calories", mealType: "makan siang"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Merah dengan Sayuran Tumis", calories: 260, carbohydrates: 35, protein: 7, fat: 9, category: "low calories", mealType: "makan siang"},

    { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Kukus", calories: 250, carbohydrates: 5, protein: 35, fat: 10, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sup Bening", calories: 100, carbohydrates: 15, protein: 5, fat: 3, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salmon Kukus", calories: 300, carbohydrates: 0, protein: 40, fat: 15, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tofu dengan Sayuran Hijau", calories: 230, carbohydrates: 15, protein: 12, fat: 10, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Panggang dengan Salad", calories: 280, carbohydrates: 10, protein: 20, fat: 15, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sayuran Panggang dengan Quinoa", calories: 250, carbohydrates: 30, protein: 8, fat: 10, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Sup Sayuran dengan Tahu", calories: 220, carbohydrates: 20, protein: 6, fat: 8, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Dada Ayam Panggang dengan Asparagus", calories: 290, carbohydrates: 10, protein: 25, fat: 12, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Pisang Panggang dengan Kayu Manis", calories: 200, carbohydrates: 35, protein: 2, fat: 4, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Bubur Quinoa dengan Sayuran", calories: 240, carbohydrates: 25, protein: 10, fat: 8, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tempeh dengan Jamur", calories: 250, carbohydrates: 15, protein: 14, fat: 10, category: "low calories", mealType: "makan malam"},
    { imageUrl: "./images/Oatmeal.jpg", name: "Salad Buah Segar", calories: 180, carbohydrates: 40, protein: 2, fat: 1, category: "low calories", mealType: "makan malam"}

    // //gluten free
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sereal Bebas Gluten dengan Susu Almond", calories: 200, carbohydrates: 35, protein: 6, fat: 5, category: "gluten free", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Telur Rebus", calories: 80, carbohydrates: 1, protein: 7, fat: 5, category: "gluten free", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Pisang Panggang", calories: 150, carbohydrates: 35, protein: 2, fat: 1, category: "gluten free", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Putih dengan Ikan", calories: 350, carbohydrates: 50, protein: 20, fat: 10, category: "gluten free", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tofu", calories: 250, carbohydrates: 30, protein: 15, fat: 12, category: "gluten free", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Sop", calories: 150, carbohydrates: 20, protein: 5, fat: 6, category: "gluten free", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sate Tahu", calories: 200, carbohydrates: 10, protein: 20, fat: 10, category: "gluten free", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Pepes", calories: 250, carbohydrates: 5, protein: 35, fat: 12, category: "gluten free", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Ayam Jahe", calories: 150, carbohydrates: 10, protein: 20, fat: 5, category: "gluten free", mealType: "makan malam"},

    // //vegan
    // { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Berry", calories: 200, carbohydrates: 45, protein: 3, fat: 2, category: "vegan", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum dengan Selai Kacang", calories: 180, carbohydrates: 30, protein: 5, fat: 7, category: "vegan", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Buah Campur", calories: 100, carbohydrates: 25, protein: 1, fat: 1, category: "vegan", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Goreng Sayuran", calories: 300, carbohydrates: 50, protein: 8, fat: 12, category: "vegan", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Pecel", calories: 200, carbohydrates: 30, protein: 10, fat: 8, category: "vegan", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Kangkung", calories: 150, carbohydrates: 20, protein: 5, fat: 7, category: "vegan", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Sop Vegan", calories: 150, carbohydrates: 20, protein: 5, fat: 6, category: "vegan", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tempe Pedas", calories: 250, carbohydrates: 20, protein: 20, fat: 10, category: "vegan", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Asem", calories: 150, carbohydrates: 25, protein: 5, fat: 5, category: "vegan", mealType: "makan malam"},
  
    // // Asam Urat - sarapan
    // //low calories
    // { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Strawberry", calories: 150, carbohydrates: 30, protein: 2, fat: 1, category: "low calories", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Oatmeal dengan Apel", calories: 180, carbohydrates: 35, protein: 5, fat: 3, category: "low calories", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Salad Sayur dengan Lemon", calories: 120, carbohydrates: 20, protein: 3, fat: 2, category: "low calories", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Panggang dengan Sayur", calories: 300, carbohydrates: 10, protein: 35, fat: 10, category: "low calories", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Salad Sayuran dengan Tuna", calories: 200, carbohydrates: 25, protein: 20, fat: 8, category: "low calories", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Ikan", calories: 180, carbohydrates: 15, protein: 20, fat: 8, category: "low calories", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Kukus dengan Sayur", calories: 250, carbohydrates: 5, protein: 35, fat: 10, category: "low calories", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Bening dengan Ayam", calories: 100, carbohydrates: 15, protein: 5, fat: 3, category: "low calories", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Salmon Kukus dengan Brokoli", calories: 300, carbohydrates: 0, protein: 40, fat: 15, category: "low calories", mealType: "makan malam"},

    // // gluten free
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sereal Bebas Gluten dengan Buah", calories: 200, carbohydrates: 35, protein: 6, fat: 5, category: "gluten free", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Telur Rebus dengan Sayuran", calories: 80, carbohydrates: 1, protein: 7, fat: 5, category: "gluten free", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Pisang Kukus", calories: 150, carbohydrates: 35, protein: 2, fat: 1, category: "gluten free", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Merah dengan Sayur", calories: 350, carbohydrates: 50, protein: 20, fat: 10, category: "gluten free", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tahu", calories: 250, carbohydrates: 30, protein: 15, fat: 12, category: "gluten free", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Bayam", calories: 150, carbohydrates: 20, protein: 5, fat: 6, category: "gluten free", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sate Jamur", calories: 200, carbohydrates: 10, protein: 20, fat: 10, category: "gluten free", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Kukus dengan Sayuran", calories: 250, carbohydrates: 5, protein: 35, fat: 12, category: "gluten free", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Tahu", calories: 150, carbohydrates: 10, protein: 20, fat: 5, category: "gluten free", mealType: "makan malam"},

    // //vegan
    // { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Mangga", calories: 200, carbohydrates: 45, protein: 3, fat: 2, category: "vegan", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum dengan Alpukat", calories: 180, carbohydrates: 30, protein: 5, fat: 7, category: "vegan", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Buah Campur dengan Jeruk", calories: 100, carbohydrates: 25, protein: 1, fat: 1, category: "vegan", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Goreng Tempe", calories: 300, carbohydrates: 50, protein: 8, fat: 12, category: "vegan", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Urap-Urap", calories: 200, carbohydrates: 30, protein: 10, fat: 8, category: "vegan", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Kacang Panjang", calories: 150, carbohydrates: 20, protein: 5, fat: 7, category: "vegan", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Lodeh Vegan", calories: 150, carbohydrates: 20, protein: 5, fat: 6, category: "vegan", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tempe", calories: 250, carbohydrates: 20, protein: 20, fat: 10, category: "vegan", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Asem dengan Tempe", calories: 150, carbohydrates: 25, protein: 5, fat: 5, category: "vegan", mealType: "makan malam"},
  
    // // Darah Tinggi - sarapan, makan siang, makan malam
    // //low calories
    // { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Blueberry", calories: 150, carbohydrates: 30, protein: 2, fat: 1, category: "low calories", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Oatmeal dengan Berry", calories: 180, carbohydrates: 35, protein: 5, fat: 3, category: "low calories", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Salad Sayur dengan Biji-bijian", calories: 120, carbohydrates: 20, protein: 3, fat: 2, category: "low calories", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Panggang dengan Sayuran", calories: 300, carbohydrates: 10, protein: 35, fat: 10, category: "low calories", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Salad Tuna", calories: 200, carbohydrates: 25, protein: 20, fat: 8, category: "low calories", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Daging", calories: 180, carbohydrates: 15, protein: 20, fat: 8, category: "low calories", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Bakar dengan Sayur", calories: 250, carbohydrates: 5, protein: 35, fat: 10, category: "low calories", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Sayur", calories: 100, carbohydrates: 15, protein: 5, fat: 3, category: "low calories", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ayam Kukus dengan Lemon", calories: 300, carbohydrates: 0, protein: 40, fat: 15, category: "low calories", mealType: "makan malam"},

    // //gluten free
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sereal Bebas Gluten dengan Biji-bijian", calories: 200, carbohydrates: 35, protein: 6, fat: 5, category: "gluten free", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Telur Rebus dengan Alpukat", calories: 80, carbohydrates: 1, protein: 7, fat: 5, category: "gluten free", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Pisang Bakar", calories: 150, carbohydrates: 35, protein: 2, fat: 1, category: "gluten free", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Merah dengan Tofu", calories: 350, carbohydrates: 50, protein: 20, fat: 10, category: "gluten free", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Brokoli dengan Udang", calories: 250, carbohydrates: 30, protein: 15, fat: 12, category: "gluten free", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Bening", calories: 150, carbohydrates: 20, protein: 5, fat: 6, category: "gluten free", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sate Udang", calories: 200, carbohydrates: 10, protein: 20, fat: 10, category: "gluten free", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Ikan Kukus dengan Sayur Asparagus", calories: 250, carbohydrates: 5, protein: 35, fat: 12, category: "gluten free", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sup Kacang Merah", calories: 150, carbohydrates: 10, protein: 20, fat: 5, category: "gluten free", mealType: "makan malam"},

    // //vegan
    // { imageUrl: "./images/Oatmeal.jpg", name: "Smoothie Kiwi", calories: 200, carbohydrates: 45, protein: 3, fat: 2, category: "vegan", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Roti Gandum dengan Hummus", calories: 180, carbohydrates: 30, protein: 5, fat: 7, category: "vegan", mealType: "sarapan"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Buah Campur dengan Yoghurt", calories: 100, carbohydrates: 25, protein: 1, fat: 1, category: "vegan", mealType: "sarapan"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Nasi Goreng Kacang Polong", calories: 300, carbohydrates: 50, protein: 8, fat: 12, category: "vegan", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Lalapan", calories: 200, carbohydrates: 30, protein: 10, fat: 8, category: "vegan", mealType: "makan siang"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Sayuran", calories: 150, carbohydrates: 20, protein: 5, fat: 7, category: "vegan", mealType: "makan siang"},
    
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Bayam", calories: 150, carbohydrates: 20, protein: 5, fat: 6, category: "vegan", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Tumis Tempe dengan Cabai", calories: 250, carbohydrates: 20, protein: 20, fat: 10, category: "vegan", mealType: "makan malam"},
    // { imageUrl: "./images/Oatmeal.jpg", name: "Sayur Lodeh", calories: 150, carbohydrates: 25, protein: 5, fat: 5, category: "vegan", mealType: "makan malam"},
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
