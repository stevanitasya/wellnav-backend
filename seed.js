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
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/SmoothieAlpukat.jpg", 
    name:  "Smoothie Alpukat", 
    calories: 180, 
    carbohydrates: 30, 
    protein: 3, 
    fat: 10, 
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/SaladBuah.jpg", 
    name:  "Salad Buah", 
    calories: 120, 
    carbohydrates: 20, 
    protein: 2, 
    fat: 1, 
    category: ["Rendah Kalori", "Bebas Gluten","Vegan"], 
    mealType: ["Sarapan", "Makan Siang"]
  },
  { 
    imageUrl: "./images/OmeletteSayuran.jpg", 
    name:  "Omelette Sayuran", 
    calories: 200, 
    carbohydrates: 6, 
    protein: 12, 
    fat: 15, 
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/BuburJagung.jpg", 
    name:  "Bubur Jagung", 
    calories: 150, 
    carbohydrates: 28, 
    protein: 3, 
    fat: 2, 
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/TelurRebus.jpg", 
    name:  "Telur Rebus", 
    calories: 70, 
    carbohydrates: 1, 
    protein: 6, 
    fat: 5, 
    category: ["Rendah Kalori", "Bebas Gluten"], 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/ChiaSeedPudding.jpg", 
    name:  "Chia Seed Pudding", 
    calories: 140, 
    carbohydrates: 12, 
    protein: 4, 
    fat: 9, 
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/AvocadoToast.jpg", 
    name:  "Avocado Toast", 
    calories: 160, 
    carbohydrates: 18, 
    protein: 4, 
    fat: 9, 
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/GreenSmoothie.jpg", 
    name:  "Green Smoothie", 
    calories: 110, 
    carbohydrates: 22, 
    protein: 2, 
    fat: 1, 
    category: "Rendah Kalori", 
    mealType: "Sarapan"
  },

  //Makan Siang
  { 
    imageUrl: "./images/SaladAyam.jpg",
    name:  "Salad Ayam", 
    calories: 300, 
    carbohydrates: 10, 
    protein: 30, 
    fat: 15, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/SupSayuran.jpg",
    name:  "Sup Sayuran", 
    calories: 150, 
    carbohydrates: 25, 
    protein: 5, 
    fat: 5, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/IkanBakar.jpg",
    name:  "Ikan Bakar", 
    calories: 350, 
    carbohydrates: 5, 
    protein: 40, 
    fat: 15, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/GadoGado.jpg",
    name:  "Gado-Gado", 
    calories: 300, 
    carbohydrates: 28, 
    protein: 12, 
    fat: 18, 
    category: ["Rendah Kalori", "Bebas Gluten","Vegan"], 
    mealType: ["Makan Siang", "Makan Malam"]
  },
  { 
    imageUrl: "./images/UrapSayur.jpg",
    name:  "Urap Sayuran", 
    calories: 180, 
    carbohydrates: 20, 
    protein: 5, 
    fat: 8, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/TumisKangkung.jpg",
    name:  "Tumis Kangkung", 
    calories: 100, 
    carbohydrates: 10, 
    protein: 3, 
    fat: 5, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/PepesTahu.jpg",
    name:  "Pepes Tahu", 
    calories: 140, 
    carbohydrates: 10, 
    protein: 10, 
    fat: 6, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/Pecel.jpg",
    name:  "Pecel", 
    calories: 220, 
    carbohydrates: 22, 
    protein: 8, 
    fat: 12, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/AyamPanggangRujak.jpg",
    name:  "Ayam Panggang Bumbu Rujak", 
    calories: 250, 
    carbohydrates: 10, 
    protein: 20, 
    fat: 15, 
    category: "Rendah Kalori", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/OsengTempe.jpg",
    name:  "Oseng Tempe", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 12, 
    fat: 8, 
    category: ["Rendah Kalori", "Bebas Gluten"], 
    mealType: ["Makan Siang", "Makan Malam"]
  },

  //Makan Malam
  { 
    imageUrl: "./images/SalmonPanggang.jpg",
    name:  "Salmon Panggang", 
    calories: 400, 
    carbohydrates: 0, 
    protein: 40, 
    fat: 25, 
    category: "Rendah Kalori", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/TumisBrokoli.jpg",
    name:  "Tumis Brokoli", 
    calories: 180, 
    carbohydrates: 15, 
    protein: 5, 
    fat: 10, 
    category: "Rendah Kalori", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/AyamRebus.jpg",
    name:  "Ayam Rebus", 
    calories: 300, 
    carbohydrates: 5, 
    protein: 35, 
    fat: 15, 
    category: "Rendah Kalori", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/CapcayKuah.jpg",
    name:  "Capcay Kuah", 
    calories: 200, 
    carbohydrates: 18, 
    protein: 10, 
    fat: 8, 
    category: ["Rendah Kalori", "Bebas Gluten","Vegan"], 
    mealType: ["Makan Siang", "Makan Malam"]
  },
  { 
    imageUrl: "./images/SupAyam.jpg",
    name:  "Sup Ayam", 
    calories: 250, 
    carbohydrates: 10, 
    protein: 25, 
    fat: 12, 
    category: "Rendah Kalori", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/TahuKukus.jpg",
    name:  "Tahu Kukus", 
    calories: 150, 
    carbohydrates: 10, 
    protein: 12, 
    fat: 6, 
    category: "Rendah Kalori", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/SopBuntut.jpg",
    name:  "Sop Buntut", 
    calories: 300, 
    carbohydrates: 12, 
    protein: 25, 
    fat: 18, 
    category: ["Rendah Kalori", "Bebas Gluten"], 
    mealType: ["Makan Siang", "Makan Malam"]
  },
  { 
    imageUrl: "./images/GulaiKambing.jpg",
    name:  "Gulai Kambing", 
    calories: 350, 
    carbohydrates: 10, 
    protein: 30, 
    fat: 20, 
    category: "Rendah Kalori", 
    mealType: "Makan Malam"
  },
   
  //gluten free
  { 
    imageUrl: "./images/TelurOrak.jpg",
    name:  "Telur Orak-arik", 
    calories: 90, 
    carbohydrates: 1, 
    protein: 7, 
    fat: 6, 
    category: ["Bebas Gluten","Vegan"], 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/BuburAyam.jpg",
    name:  "Bubur Ayam", 
    calories: 250, 
    carbohydrates: 30, 
    protein: 15, 
    fat: 10, 
    category: "Bebas Gluten", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/PancakePisang.jpg",
    name:  "Pancake Pisang", 
    calories: 150, 
    carbohydrates: 30, 
    protein: 5, 
    fat: 2, 
    category: ["Bebas Gluten","Vegan"], 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/SmoothieBowl.jpg",
    name:  "Smoothie Bowl", 
    calories: 180, 
    carbohydrates: 35, 
    protein: 6, 
    fat: 4, 
    category: ["Bebas Gluten","Vegan"], 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/GranolaBebasGluten.jpg",
    name:  "Granola Bebas Gluten", 
    calories: 220, 
    carbohydrates: 30, 
    protein: 7, 
    fat: 8, 
    category: "Bebas Gluten", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/Ketoprak.jpg",
    name:  "Ketoprak", 
    calories: 250, 
    carbohydrates: 35, 
    protein: 10, 
    fat: 8, 
    category: ["Bebas Gluten","Vegan"], 
    mealType: ["Sarapan", "Makan Siang"]
  },
  { 
    imageUrl: "./images/Oatmeal.jpg",
    name:  "Yogurt dengan Madu", 
    calories: 100, 
    carbohydrates: 18, 
    protein: 5, 
    fat: 2, 
    category: ["Rendah Kalori", "Bebas Gluten","Vegan"], 
    mealType: "Sarapan"
  },

  //Makan Siang
  { 
    imageUrl: "./images/GulaiIkan.jpg",
    name:  "Gulai Ikan", 
    calories: 350, 
    carbohydrates: 10, 
    protein: 30, 
    fat: 18, 
    category: "Bebas Gluten", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/PepesIkan.jpg",
    name:  "Pepes Ikan", 
    calories: 250, 
    carbohydrates: 5, 
    protein: 28, 
    fat: 12, 
    category: "Bebas Gluten", 
    mealType: ["Makan Siang", "Makan Malam"]
  },
  { 
    imageUrl: "./images/SopIga.jpg",
    name:  "Sop Iga", 
    calories: 450, 
    carbohydrates: 30, 
    protein: 35, 
    fat: 20, 
    category: "Bebas Gluten", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/TumisJamur.jpg",
    name:  "Tumis Jamur", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 10, 
    fat: 8, 
    category: "Bebas Gluten", 
    mealType: "Makan Siang"
  },
  { 
    imageUrl: "./images/AyamTaliwang.jpg",
    name:  "Ayam Taliwang", 
    calories: 320, 
    carbohydrates: 8, 
    protein: 28, 
    fat: 18, 
    category: "Bebas Gluten", 
    mealType: ["Makan Siang", "Makan Malam"]
  },
  { 
    imageUrl: "./images/TempeBacem.jpg",
    name:  "Tempe Bacem", 
    calories: 270, 
    carbohydrates: 20, 
    protein: 15, 
    fat: 10, 
    category: "Bebas Gluten", 
    mealType: "Makan Siang"
  },
  
  //Makan Malam
  { 
    imageUrl: "./images/SupJamur.jpg",
    name:  "Sup Jamur", 
    calories: 200, 
    carbohydrates: 15, 
    protein: 10, 
    fat: 8, 
    category: ["Bebas Gluten", "Vegan"], 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/TumisLabuSiam.jpg",
    name:  "Tumis Labu Siam", 
    calories: 140, 
    carbohydrates: 10, 
    protein: 3, 
    fat: 8, 
    category: "Bebas Gluten", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/SayurAsem.jpg",
    name:  "Sayur Asem", 
    calories: 150, 
    carbohydrates: 15, 
    protein: 5, 
    fat: 4, 
    category: ["Rendah Kalori", "Bebas Gluten","Vegan"], 
    mealType: ["Makan Siang", "Makan Malam"]
  },
  { 
    imageUrl: "./images/Oatmeal.jpg",
    name:  "Sup Kacang Merah", 
    calories: 250, 
    carbohydrates: 30, 
    protein: 12, 
    fat: 8, 
    category: "Bebas Gluten", 
    mealType: "Makan Malam"
  },
   

  //vegan
  { 
    imageUrl: "./images/YogurtPlain.jpg",
    name:  "Yogurt Plain", 
    calories: 120, 
    carbohydrates: 15, 
    protein: 8, 
    fat: 2, 
    category: "Vegan", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/PancakeGandum.jpg",
    name:  "Pancake Gandum", 
    calories: 200, 
    carbohydrates: 30, 
    protein: 5, 
    fat: 6, 
    category: "Vegan", 
    mealType: "Sarapan"
  },
  { 
    imageUrl: "./images/KacangAlmondPanggang.jpg",
    name:  "Kacang Almond Panggang", 
    calories: 160, 
    carbohydrates: 8, 
    protein: 6, 
    fat: 14, 
    category: "Vegan", 
    mealType: "Sarapan"
  },

  //Makan Siang
  { 
    imageUrl: "./images/SandwichGandumKejuSayuran.jpg",
    name:  "Sandwich Gandum dengan Keju dan Sayuran", 
    calories: 280, 
    carbohydrates: 30, 
    protein: 10, 
    fat: 12, 
    category: "Vegan", 
    mealType: "Makan Siang"
  },
  
  //Makan Malam 
  { 
    imageUrl: "./images/SayurLodeh.jpg",
    name:  "Sayur Lodeh", 
    calories: 350, 
    carbohydrates: 40, 
    protein: 15, 
    fat: 15, 
    category: ["Bebas Gluten","Vegan"], 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/Karedok.jpg",
    name:  "Karedok", 
    calories: 200, 
    carbohydrates: 20, 
    protein: 10, 
    fat: 10, 
    category: "Vegan", 
    mealType: "Makan Malam"
  },
  { 
    imageUrl: "./images/TumisBuncisTofu.jpg",
    name:  "Tumis Buncis dengan Tofu", 
    calories: 220, 
    carbohydrates: 12, 
    protein: 14, 
    fat: 9, 
    category: "Vegan", 
    mealType: "Makan Malam"
  },
];

const seedRecommendationArticle = [
  // Low-Calorie Recipes
  {  
    title: "Ayam Panggang Kuning", 
    imageUrl: "./images/AyamPanggangKuning.jpg", 
    content: "lezat dan rendah...", 
    category: "Rendah Kalori",  
    healthConditions: ["Diabetes", "GERD"], 
    link: "https://cookpad.com/id/resep/123456-ayam-panggang-bumbu-kuning"
  },
  { 
    title: "Soto Ayam", 
    imageUrl: "./images/SotoAyam.jpg", 
    content: "Penderita Diabetes...", 
    category: "Rendah Kalori",  
    healthConditions: ["Diabetes"], 
    link: "https://cookpad.com/id/resep/234567-soto-ayam"
  },
  { 
    title: "Sup Sayur Hijau", 
    imageUrl: "./images/SupSayurHijau.jpg", 
    content: "Penderita GERD...", 
    category: "Rendah Kalori", 
    healthConditions: ["GERD"], 
    link: "https://www.hellosehat.com/hidup-sehat/nutrisi/resep-makanan-sehat-untuk-penderita-gerd/" 
  },
  { 
    title: "Pepes Ikan", 
    imageUrl: "./images/PepesIkan.jpg", 
    content: "Penderita GERD...", 
    category: "Rendah Kalori", 
    healthConditions: ["GERD", "Asam Urat"], 
    link: "https://www.tirto.id/resep-makanan-sehat-untuk-penderita-gerd-djkH" 
  },
  { 
    title: "Tumis Kangkung", 
    imageUrl: "./images/TumisKangkung.jpg", 
    content: "Baik untuk lambung...", 
    category: "Rendah Kalori", 
    healthConditions: ["GERD"], 
    link: "https://www.healthline.com/nutrition/foods-to-eat-with-gerd" 
  },
  { 
    title: "Urap Sayuran", 
    imageUrl: "./images/UrapSayur.jpg", 
    content: "Sayuran sehat...", 
    category: "Rendah Kalori", 
    healthConditions: ["GERD"], 
    link: "https://www.healthline.com/nutrition/foods-to-eat-with-gerd" 
  },
  { 
    title: "Sup Ayam Sayur", 
    imageUrl: "./images/SupAyam.jpg", 
    content: "Pilihan rendah...", 
    category: "Rendah Kalori",  
    healthConditions: ["Asam Urat"], 
    link: "https://www.fimela.com/5-resep-masakan-lezat-yang-aman-untuk-penderita-asam-urat" 
  },
  { 
    title: "Tumis Tahu", 
    imageUrl: "./images/TumisTahu.jpg", 
    content: "Pilihan rendah...", 
    category: "Rendah Kalori",  
    healthConditions: ["Asam Urat"], 
    link: "https://www.fimela.com/5-resep-masakan-lezat-yang-aman-untuk-penderita-asam-urat" 
  },
  { 
    title: "Sup Tomat", 
    imageUrl: "./images/SupTomat.jpg", 
    content: "Untuk Darah tinggi...", 
    category: "Rendah Kalori",  
    healthConditions: ["Darah tinggi"], 
    link: "https://www.halosehat.com/penyakit/tekanan-darah-tinggi/25-makanan-untuk-darah-tinggi-super-ampuh-dan-aman"
  },
  { 
    title: "Tumis Labu Siam", 
    imageUrl: "./images/TumisLabuSiam.jpg", 
    content: "Pilihan rendah...", 
    category: "Rendah Kalori",  
    healthConditions: ["Darah tinggi"], 
    link: "https://www.fimela.com/food/read/4299277/7-resep-masakan-untuk-penderita-kolesterol-dan-darah-tinggi"
  },
  { 
    title: "Sayur Daun Kelor", 
    imageUrl: "./images/SayurBeningDaunKelor.jpg", 
    content: "Untuk tekanan darah...", 
    category: "Rendah Kalori",  
    healthConditions: ["Darah tinggi"], 
    link: "https://www.fimela.com/food/read/4299277/7-resep-masakan-untuk-penderita-kolesterol-dan-darah-tinggi"
  },


  // Gluten-Free Recipes
  { 
    title: "Nasi Goreng Kol", 
    imageUrl: "./images/NasiGorengKembangKol.jpg", 
    content: "Bagus sebagai...", 
    category: "Bebas Gluten",  
    healthConditions: ["Diabetes"], 
    link: "https://cookpad.com/id/resep/345678-nasi-goreng-kembang-kol"
  },
  { 
    title: "Pepes Ikan", 
    imageUrl: "./images/PepesIkan.jpg", 
    content: "Bebas gluten...", 
    category: "Bebas Gluten",  
    healthConditions: ["Diabetes", "Asam Urat", "Darah tinggi"], 
    link: "https://cookpad.com/id/resep/456789-pepes-ikan"
  },
  { 
    title: "Sate Sapi", 
    imageUrl: "./images/SateSapi.jpg", 
    content: "Untuk penderita GERD...", 
    category: "Bebas Gluten", 
    healthConditions: ["GERD"], 
    link: "https://www.tirto.id/resep-makanan-sehat-untuk-penderita-gerd-djkH" 
  },
  { 
    title: "Pisang Rebus", 
    imageUrl: "./images/PisangRebus.jpg", 
    content: "Penderita GERD...", 
    category: "Bebas Gluten", 
    healthConditions: ["GERD"], 
    link: "https://www.healthline.com/nutrition/foods-to-eat-with-gerd" 
  },
  { 
    title: "Sayur Lodeh", 
    imageUrl: "./images/SayurLodeh.jpg", 
    content: "Untuk penderita GERD...", 
    category: "Bebas Gluten", 
    healthConditions: ["GERD", "Darah tinggi"], 
    link: "https://www.healthline.com/nutrition/foods-to-eat-with-gerd" 
  },
  { 
    title: "Kentang Rebus", 
    imageUrl: "./images/KentangRebus.jpg", 
    content: "Untuk penderita asam urat.", 
    category: "Bebas Gluten",  
    healthConditions: ["Asam Urat", "Darah tinggi"], 
    link: "https://www.fimela.com/5-resep-masakan-lezat-yang-aman-untuk-penderita-asam-urat" 
  },

  //vegan Recipes
  { 
    title: "Gado-Gado", 
    imageUrl: "./images/GadoGado.jpg", 
    content: "Tanpa bahan...", 
    category: "Vegan",  
    healthConditions: ["GERD", "Diabetes", "Asam Urat"], 
    link: "https://cookpad.com/id/resep/567890-gado-gado"
  
  },
  { 
  title: "Tumis Kangkung", 
  imageUrl: "./images/TumisKangkung.jpg", 
  content: "Sederhana..",   
  category: "Vegan",  
  healthConditions: ["Diabetes", "GERD"], 
  link: "https://cookpad.com/id/resep/789012-tumis-kangkung"
  },
  { 
    title: "Ubi Cilembu Panggang", 
    imageUrl: "./images/UbiCilembuPanggang.jpg", 
    content: "Camilan bebas gluten...", 
    category: "Vegan",  
    healthConditions: ["Asam Urat", "Darah tinggi"], 
    link: "https://www.fimela.com/5-resep-masakan-lezat-yang-aman-untuk-penderita-asam-urat" 
  },
  { 
    title: "Singkong Rebus", 
    imageUrl: "./images/SingkongRebus.jpg", 
    content: "Untuk penderita...", 
    category: "Vegan",  
    healthConditions: ["Asam Urat", "Darah tinggi"], 
    link: "https://www.fimela.com/5-resep-masakan-lezat-yang-aman-untuk-penderita-asam-urat" 
  },
  { 
    title: "Singkong", 
    imageUrl: "./images/SingkongRebus.jpg", 
    content: "penderita...", 
    category: "Vegan",  
    healthConditions: ["Asam Urat", "Darah tinggi"], 
    link: "https://www.fimela.com/5-resep-masakan-lezat-yang-aman-untuk-penderita-asam-urat" 
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
