exports.getLandingPage = (req, res) => {
  console.log('getLandingPage called'); 
  res.json({
    home: {
      title: "Guiding You Towards a Healthier Future.",
      description: "Your guide to healthy eating, tailored to your health needs.",
      features: [
        { name: "Pelacakan Nutrisi", description: "Dapat melacak asupan nutrisi yang didapat sesuai dengan jenis makanan yang dikonsumsi.", image: ".png" },
        { name: "Pengukuran Kalori", description: "Informasi mengenai jumlah kalori, karbohidrat, dll yang bertujuan untuk melacak dampak makanan terhadap tubuh.", image: "" },
        { name: "Notifikasi dan Pengingat", description: "Mendapat notifikasi jadwal harian yang disesuaikan dengan kondisi kesehatan pengguna.", image: "" },
        { name: "Rekomendasi Makanan", description: "Dapat merekomendasikan jenis makanan yang lebih baik dikonsumsi oleh pengguna", image: "" },
        { name: "Pelacakan Jumlah Air Putih", description: "Mendapat notifikasi jadwal harian yang disesuaikan dengan kondisi kesehatan pengguna.", image: "" }
      ],
      getStartedButton: "Sign Up"
    },
    about: {
      title: "About us",
      content: "Halo teman-teman semua. Perkenalkan kami tiga mahasiswa semester akhir dari Universitas Bina Nusantara...",
      MoreButton: "About"
    },
    faq: {
      title: "FAQ"
    }
  });
};

exports.getAboutPage = (req, res) => {
  console.log('getAboutPage called');
  res.json({
    developers: [      {
        name: "Stevani Natasya Sero",
        nim: "2440022605",
        photo: "/images/photo_stevani.jpg"
      },
      {
        name: "Azzah Husna Almy",
        nim: "2440058025",
        photo: "/images/photo_azzah.jpg"
      },
      {
        name: "Jesen Yeoko",
        nim: "2440058025",
        photo: "/images/photo_jesen.jpg"
      }
    ]
  });
};

exports.getFAQPage = (req, res) => {
  console.log('getFAQPage called');
  res.json({
    faq: [      {
        question: "Apa itu aplikasi WellNav?",
        answer: "WellNav adalah aplikasi revolusioner yang membantu pengguna menuju gaya hidup sehat yang terpersonalisasi. Aplikasi ini menawarkan rekomendasi makanan berdasarkan kondisi kesehatan individu, preferensi makanan, dan tujuan kesehatan. WellNav juga menyediakan pelacakan nutrisi harian yang akurat, memungkinkan pengguna memantau asupan kalori, nutrisi, dan makronutrien. Dengan antarmuka yang intuitif dan mudah digunakan, WellNav dapat menyesuaikan dengan kebutuhan khusus seperti alergi makanan dan kondisi kesehatan tertentu, menjadi katalisator perubahan positif dalam pola makan dan kesehatan."
      },
      {
        question: "Bagaimana WellNav menyesuaikan panduannya dengan profil kesehatan pengguna?",
        answer: "WellNav menyesuaikan panduan berdasarkan informasi kesehatan yang Anda berikan saat mendaftar dan memperbarui profil. Aplikasi ini menganalisis usia, kondisi kesehatan (seperti GERD, Asam Urat, dll), dan preferensi diet Anda. Berdasarkan analisis ini, WellNav memberikan rekomendasi makanan yang sesuai dengan kondisi kesehatan Anda, menawarkan daftar makanan yang perlu dihindari, melacak konsumsi harian, dan memberikan notifikasi serta pengingat untuk membantu Anda tetap pada jalur diet yang sehat."
      },
      {
        question: "Bagaimana Pelacakan Nutrisi membantu pengguna?",
        answer: "Pelacakan Nutrisi di WellNav membantu pengguna dengan mencatat makanan yang dikonsumsi setiap hari dan menghitung jumlah kalori, karbohidrat, protein, dan lemak yang masuk ke tubuh. Fitur ini menyediakan grafik yang memvisualisasikan data nutrisi sehingga Anda bisa melihat bagaimana makanan yang Anda konsumsi berdampak pada kesehatan Anda. Selain itu, pelacakan nutrisi memberikan peringatan jika ada asupan makanan yang berlebihan atau dapat memperburuk kondisi kesehatan Anda, membantu Anda membuat pilihan yang lebih baik untuk mencapai tujuan kesehatan Anda."
      },
      {
        question: "Apakah aplikasi WellNav dapat menghitung jumlah nutrisi untuk setiap makanan yang dikonsumsi?",
        answer: "WellNav memberikan fitur yang dapat mempermudah pengguna untuk menghitung jumlah nutrisi setiap hari nya seperti jumlah kalori, karbohidrat, protein, dan lemak. Informasi ini membantu pengguna membuat keputusan yang lebih baik tentang makanan yang dikonsumsi."
      }, 
      {
        question: "Apakah WellNav dapat membantu saya melacak konsumsi air putih harian saya?",
        answer: "WellNav memiliki fitur Pelacakan Air Putih yang memungkinkan pengguna mencatat jumlah air yang dikonsumsi setiap hari. Fitur ini juga memberikan pengingat untuk memastikan pengguna tetap terhidrasi dengan baik sepanjang hari."
      }
    ]
  });
};