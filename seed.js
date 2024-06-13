const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./models/Food');
const RecommendationArticle = require('./models/RecommendationArticle');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  
  })
  .catch((err) => {
    console.error('Connection error', err);
  
  });
  

const seedFoods = [
   //low calories
  { 
    imageUrl: "./images/Oatmeal.jpg", 
    name:  "Oatmeal", 
    calories: 150, 
    carbohydrates: 27, 
    protein: 5, 
    fat: 3, 
    category: "low calories", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/SmoothieAlpukat.jpg", 
    name:  "Smoothie Alpukat", 
    calories: 180, 
    carbohydrates: 30, 
    protein: 3, 
    fat: 10, 
    category: "low calories", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/SaladBuah.jpg", 
    name:  "Salad Buah", 
    calories: 120, 
    carbohydrates: 20, 
    protein: 2, 
    fat: 1, 
    category: ["low calories", "gluten free","vegan"], 
    mealType: "sarapan, makan siang"
  },
  { 
    imageUrl: "./images/OmeletteSayuran.jpg", 
    name:  "Omelette Sayuran", 
    calories: 200, 
    carbohydrates: 6, 
    protein: 12, 
    fat: 15, 
    category: "low calories", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/BuburJagung.jpg", 
    name:  "Bubur Jagung", 
    calories: 150, 
    carbohydrates: 28, 
    protein: 3, 
    fat: 2, 
    category: "low calories", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/TelurRebus.jpg", 
    name:  "Telur Rebus", 
    calories: 70, 
    carbohydrates: 1, 
    protein: 6, 
    fat: 5, 
    category: ["low calories", "gluten free"], 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/ChiaSeedPudding.jpg", 
    name:  "Chia Seed Pudding", 
    calories: 140, 
    carbohydrates: 12, 
    protein: 4, 
    fat: 9, 
    category: "low calories", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/AvocadoToast.jpg", 
    name:  "Avocado Toast", 
    calories: 160, 
    carbohydrates: 18, 
    protein: 4, 
    fat: 9, 
    category: "low calories", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/GreenSmoothie.jpg", 
    name:  "Green Smoothie", 
    calories: 110, 
    carbohydrates: 22, 
    protein: 2, 
    fat: 1, 
    category: "low calories", 
    mealType: "sarapan"
  },

  //makan siang
  { 
    imageUrl: "./images/SaladAyam.jpg",
    name:  "Salad Ayam", 
    calories: 300, 
    carbohydrates: 10, 
    protein: 30, 
    fat: 15, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/SupSayuran.jpg",
    name:  "Sup Sayuran", 
    calories: 150, 
    carbohydrates: 25, 
    protein: 5, 
    fat: 5, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/IkanBakar.jpg",
    name:  "Ikan Bakar", 
    calories: 350, 
    carbohydrates: 5, 
    protein: 40, 
    fat: 15, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/GadoGado.jpg",
    name:  "Gado-Gado", 
    calories: 300, 
    carbohydrates: 28, 
    protein: 12, 
    fat: 18, 
    category: ["low calories", "gluten free","vegan"], 
    mealType: "makan siang, makan malam"
  },
  { 
    imageUrl: "./images/UrapSayur.jpg",
    name:  "Urap Sayuran", 
    calories: 180, 
    carbohydrates: 20, 
    protein: 5, 
    fat: 8, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/TumisKangkung.jpg",
    name:  "Tumis Kangkung", 
    calories: 100, 
    carbohydrates: 10, 
    protein: 3, 
    fat: 5, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/PepesTahu.jpg",
    name:  "Pepes Tahu", 
    calories: 140, 
    carbohydrates: 10, 
    protein: 10, 
    fat: 6, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/Pecel.jpg",
    name:  "Pecel", 
    calories: 220, 
    carbohydrates: 22, 
    protein: 8, 
    fat: 12, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/SotoAyama.jpg",
    name:  "Soto Ayam", 
    calories: 200, 
    carbohydrates: 12, 
    protein: 18, 
    fat: 8, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/AyamPanggangRujak.jpg",
    name:  "Ayam Panggang Bumbu Rujak", 
    calories: 250, 
    carbohydrates: 10, 
    protein: 20, 
    fat: 15, 
    category: "low calories", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/OsengTempe.jpg",
    name:  "Oseng Tempe", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 12, 
    fat: 8, 
    category: ["low calories", "gluten free"], 
    mealType: "makan siang, makan malam"
  },

  //makan malam
  { 
    imageUrl: "./images/SalmonPanggang.jpg",
    name:  "Salmon Panggang", 
    calories: 400, 
    carbohydrates: 0, 
    protein: 40, 
    fat: 25, 
    category: "low calories", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/TumisBrokoli.jpg",
    name:  "Tumis Brokoli", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 5, 
    fat: 10, 
    category: "low calories", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/AyamRebus.jpg",
    name:  "Ayam Rebus", 
    calories: 300, 
    carbohydrates: 5, 
    protein: 35, 
    fat: 15, 
    category: "low calories", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/CapcayKuah.jpg",
    name:  "Capcay Kuah", 
    calories: 200, 
    carbohydrates: 18, 
    protein: 10, 
    fat: 8, 
    category: ["low calories", "gluten free","vegan"], 
    mealType: "makan malam, makan siang"
  },
  { 
    imageUrl: "./images/SupAyam.jpg",
    name:  "Sup Ayam", 
    calories: 250, 
    carbohydrates: 10, 
    protein: 25, 
    fat: 12, 
    category: "low calories", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/TahuKukus.jpg",
    name:  "Tahu Kukus", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 12, 
    fat: 6, 
    category: "low calories", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/SopBuntut.jpg",
    name:  "Sop Buntut", 
    calories: 300, 
    carbohydrates: 12, 
    protein: 25, 
    fat: 18, 
    category: ["low calories", "gluten free"], 
    mealType: "makan siang, makan malam"
  },
  { 
    imageUrl: "./images/GulaiKambing.jpg",
    name:  "Gulai Kambing", 
    calories: 350, 
    carbohydrates: 10, 
    protein: 30, 
    fat: 20, 
    category: "low calories", 
    mealType: "makan malam"
  },
   
  //gluten free
  { 
    imageUrl: "./images/TelurOrak.jpg",
    name:  "Telur Orak-arik", 
    calories: 90, 
    carbohydrates: 1, 
    protein: 7, 
    fat: 6, 
    category: ["gluten free","vegan"], 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/BuburAyam.jpg",
    name:  "Bubur Ayam", 
    calories: 250, 
    carbohydrates: 30, 
    protein: 15, 
    fat: 10, 
    category: "gluten free", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/PancakePisang.jpg",
    name:  "Pancake Pisang", 
    calories: 150, 
    carbohydrates: 30, 
    protein: 5, 
    fat: 2, 
    category: ["gluten free","vegan"], 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/SmoothieBowl.jpg",
    name:  "Smoothie Bowl", 
    calories: 180, 
    carbohydrates: 35, 
    protein: 6, 
    fat: 4, 
    category: ["gluten free","vegan"], 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/GranolaBebasGluten.jpg",
    name:  "Granola Bebas Gluten", 
    calories: 220, 
    carbohydrates: 30, 
    protein: 7, 
    fat: 8, 
    category: "gluten free", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/Ketoprak.jpg",
    name:  "Ketoprak", 
    calories: 250, 
    carbohydrates: 35, 
    protein: 10, 
    fat: 8, 
    category: ["gluten free","vegan"], 
    mealType: "sarapan, makan siang"
  },
  { 
    imageUrl: "./images/Oatmeal.jpg",
    name:  "Yogurt dengan Madu", 
    calories: 100, 
    carbohydrates: 18, 
    protein: 5, 
    fat: 2, 
    category: ["low calories", "gluten free","vegan"], 
    mealType: "sarapan"
  },

  //makan siang
  { 
    imageUrl: "./images/GulaiIkan.jpg",
    name:  "Gulai Ikan", 
    calories: 350, 
    carbohydrates: 10, 
    protein: 30, 
    fat: 18, 
    category: "gluten free", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/PepesIkan.jpg",
    name:  "Pepes Ikan", 
    calories: 250, 
    carbohydrates: 5, 
    protein: 28, 
    fat: 12, 
    category: "gluten free", 
    mealType: "makan siang, makan malam"
  },
  { 
    imageUrl: "./images/SopIga.jpg",
    name:  "Sop Iga", 
    calories: 450, 
    carbohydrates: 30, 
    protein: 35, 
    fat: 20, 
    category: "gluten free", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/TumisJamur.jpg",
    name:  "Tumis Jamur", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 10, 
    fat: 8, 
    category: "gluten free", 
    mealType: "makan siang"
  },
  { 
    imageUrl: "./images/AyamTaliwang.jpg",
    name:  "Ayam Taliwang", 
    calories: 320, 
    carbohydrates: 8, 
    protein: 28, 
    fat: 18, 
    category: "gluten free", 
    mealType: "makan siang, makan malam"
  },
  { 
    imageUrl: "./images/TempeBacem.jpg",
    name:  "Tempe Bacem", 
    calories: 270, 
    carbohydrates: 20, 
    protein: 15, 
    fat: 10, 
    category: "gluten free", 
    mealType: "makan siang"
  },
  
  //makan malam
  { 
    imageUrl: "./images/Sate Ayam.jpg",
    name:  "Sate Ayam", 
    calories: 350, 
    carbohydrates: 20, 
    protein: 30, 
    fat: 20, 
    category: "gluten free", 
    mealType: "makan siang, makan malam"
  },
  { 
    imageUrl: "./images/SupJamur.jpg",
    name:  "Sup Jamur", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 10, 
    fat: 8, 
    category: ["gluten free", "vegan"], 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/TumisLabuSiam.jpg",
    name:  "Tumis Labu Siam", 
    calories: 140, 
    carbohydrates: 10, 
    protein: 3, 
    fat: 8, 
    category: "gluten free", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/SayurAsem.jpg",
    name:  "Sayur Asem", 
    calories: 150, 
    carbohydrates: 15, 
    protein: 5, 
    fat: 4, 
    category: ["low calories", "gluten free","vegan"], 
    mealType: "makan siang, makan malam"
  },
  { 
    imageUrl: "./images/Oatmeal.jpg",
    name:  "Sup Kacang Merah", 
    calories: 250, 
    carbohydrates: 30, 
    protein: 12, 
    fat: 8, 
    category: "gluten free", 
    mealType: "makan malam"
  },
   

  //vegan
  { 
    imageUrl: "./images/YogurtPlain.jpg",
    name:  "Yogurt Plain", 
    calories: 120, 
    carbohydrates: 15, 
    protein: 8, 
    fat: 2, 
    category: "vegan", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/PancakeGandum.jpg",
    name:  "Pancake Gandum", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 5, 
    fat: 6, 
    category: "vegan", 
    mealType: "sarapan"
  },
  { 
    imageUrl: "./images/KacangAlmondPanggang.jpg",
    name:  "Kacang Almond Panggang", 
    calories: 160, 
    carbohydrates: 8, 
    protein: 6, 
    fat: 14, 
    category: "vegan", 
    mealType: "sarapan"
  },

  //makan siang
  { 
    imageUrl: "./images/SandwichGandumKejuSayuran.jpg",
    name:  "Sandwich Gandum dengan Keju dan Sayuran", 
    calories: 280, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 12, 
    category: "vegan", 
    mealType: "makan siang"
  },
  
  //makan malam 
  { 
    imageUrl: "./images/Sayur Lodeh.jpg",
    name:  "Sayur Lodeh", 
    calories: 350, 
    carbohydrates: 40, 
    protein: 15, 
    fat: 15, 
    category: ["gluten free","vegan"], 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/Karedok.jpg",
    name:  "Karedok", 
    calories: 200, 
    carbohydrates: 20, 
    protein: 10, 
    fat: 10, 
    category: "vegan", 
    mealType: "makan malam"
  },
  { 
    imageUrl: "./images/TumisBuncisTofu.jpg",
    name:  "Tumis Buncis dengan Tofu", 
    calories: 220, 
    carbohydrates: 12, 
    protein: 14, 
    fat: 9, 
    category: "vegan", 
    mealType: "makan malam"
  },
];

const seedRecommendationArticle = [
  // Low-Calorie Recipes
  {  
    title: "Ayam Panggang Bumbu Kuning", 
    imageUrl: "./images/AyamPanggangKuning.jpg", 
    content: "Ayam panggang dengan bumbu kuning yang lezat dan rendah kalori.", 
    category: "low calories",  
    healthConditions: ["Diabetes", "GERD"], 
    link: "https://cookpad.com/id/resep/123456-ayam-panggang-bumbu-kuning"
  },
  { 
    title: "Soto Ayam", 
    imageUrl: "./images/SotoAyam.jpg", 
    content: "Soto ayam yang segar dan rendah kalori, cocok untuk penderita Diabetes.", 
    category: "low calories",  
    healthConditions: ["Diabetes"], 
    link: "https://cookpad.com/id/resep/234567-soto-ayam"
  },

  // Gluten-Free Recipes
  { 
    title: "Nasi Goreng Kembang Kol", 
    imageUrl: "./images/NasiGorengKembangKol.jpg", 
    content: "Nasi goreng yang dibuat dengan kembang kol sebagai pengganti nasi.", 
    category: "gluten free",  
    healthConditions: ["Diabetes"], 
    link: "https://cookpad.com/id/resep/345678-nasi-goreng-kembang-kol"
  },
  { 
    title: "Pepes Ikan", 
    imageUrl: "./images/PepesIkan.jpg", 
    content: "Pepes ikan yang kaya rasa dan bebas gluten.", 
    category: "gluten free",  
    healthConditions: ["Diabetes"], 
    link: "https://cookpad.com/id/resep/456789-pepes-ikan"
  },

  //vegan Recipes
  { 
    title: "Gado-Gado", 
    imageUrl: "./images/GadoGado.jpg", 
    content: "Gado-gado dengan saus kacang yang kaya rasa, tanpa bahan hewani.", 
    category: "vegan",  
    healthConditions: ["Diabetes", "GERD"], 
    link: "https://cookpad.com/id/resep/567890-gado-gado"
  
  },
  { 
    title: "Urap Sayuran", 
    imageUrl: "./images/UrapSayur.jpg", 
    content: "Urap sayuran yang sehat dan lezat, cocok untuk dietvegan.", 
    category: "vegan",  
    healthConditions: ["Diabetes", "GERD"], 
    link: "https://cookpad.com/id/resep/678901-urap-sayuran"
  
  },
  { 
  title: "Tumis Kangkung", 
  imageUrl: "TumisKangkung.jpg", 
  content: "Tumis kangkung yang sederhana dan enak, cocok untuk dietvegan.",   
  category: "vegan",  
  healthConditions: ["Diabetes", "GERD"], 
  link: "https://cookpad.com/id/resep/789012-tumis-kangkung"
  },
];


const seedDB = async () => {
  try {
    await Food.deleteMany({});
    await Food.insertMany(seedFoods);
    console.log('Database seeded with food data');

    await RecommendationArticle.deleteMany({});
    await RecommendationArticle.insertMany(seedRecommendationArticle);
    console.log('Database seeded with articles data');

    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDB().catch(err => {
  console.error(err);
  mongoose.connection.close();

});
