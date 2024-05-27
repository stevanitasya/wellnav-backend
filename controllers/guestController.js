exports.getLandingPage = (req, res) => {
  console.log('getLandingPage called');
  res.json({
    home: {
      title: "Guiding You Towards a Healthier Future.",
      description: "Your guide to healthy eating, tailored to your health needs.",
      features: [
        { name: "Feature 1", description: "Description of Feature 1", image: "url_to_image_1" },
        { name: "Feature 2", description: "Description of Feature 2", image: "url_to_image_2" },
        { name: "Feature 3", description: "Description of Feature 2", image: "url_to_image_2" },
        { name: "Feature 4", description: "Description of Feature 2", image: "url_to_image_2" }
      ],
      getStartedButton: "Sign Up"
    },
    about: {
      title: "About us",
      content: "Halo teman-teman semua. Perkenalkan kami tiga mahasiswa semester akhir dari Universitas Bina Nusantara...",
      MoreButton: "About"
    },
    faq: [
      { question: "What is WellNav?", answer: "WellNav is a tool to help you manage your well-being." }
    ]
  });
};

exports.getAboutPage = (req, res) => {
  console.log('getAboutPage called');
  res.json({
    developers: [
      {
        name: "Developer 1",
        nim: "123456789",
        photo: "url_to_photo_1"
      },
      {
        name: "Developer 2",
        nim: "987654321",
        photo: "url_to_photo_2"
      },
      {
        name: "Developer 3",
        nim: "987654322",
        photo: "url_to_photo_3"
      }
    ]
  });
};