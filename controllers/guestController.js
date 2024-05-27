exports.getLandingPage = (req, res) => {
  console.log('getLandingPage called');
  res.json({
    home: {
      title: "Guiding You Towards a Healthier Future.",
      description: "Your guide to healthy eating, tailored to your health needs.",
      features: [
        { name: "Pelacakan Nutrisi", description: "Dapat melacak asupan nutrisi yang didapat sesuai dengan jenis makanan yang dikonsumsi.", image: "url_to_image_1" },
        { name: "Pengukuran Kalori dan Lemak", description: "Informasi pengisian berat badan untuk melacak dampak makanan terhadap tubuh.", image: "url_to_image_2" },
        { name: "Notifikasi dan Pengingat", description: "Mendapat notifikasi jadwal harian yang disesuaikan dengan kondisi kesehatan pengguna.", image: "url_to_image_2" },
        { name: "Rekomendasi Makanan", description: "Dapat merekomendasikan jenis makanan yang lebih baik dikonsumsi oleh pengguna", image: "url_to_image_2" },
        { name: "Pelacakan Jumlah Air Putih", description: "Mendapat notifikasi jadwal harian yang disesuaikan dengan kondisi kesehatan pengguna.", image: "url_to_image_2" }
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
        answer: "test"
      },
      {
        question: "Bagaimana WellNav menyesuaikan panduannya dengan profil kesehatan pengguna?",
        answer: "test"
      },
      {
        question: "Bagaimana Pelacakan Nutrisi membantu pengguna?",
        answer: "test"
      },
      {
        question: "Apakah aplikasi WellNav memberikan informasi nutrisi untuk setiap makanan?",
        answer: "test"
      }, 
      {
        question: "Bagaimana cara mendapatkan bantuan atau dukungan teknis untuk Wellnav?",
        answer: "test"
      }
    ]
  });
};