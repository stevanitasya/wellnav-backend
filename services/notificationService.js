const schedule = require('node-schedule');

// mengatur jadwal notifikasi sesuai dengan preferensi pengguna
const scheduleNotification = (userPreference) => {
  let scheduleRule;

  // Menentukan jadwal berdasarkan preferensi pengguna
  switch (userPreference) {
    case 'hourly':
      scheduleRule = '0 * * * *'; // Setiap jam
      break;
    case 'every3hours':
      scheduleRule = '0 */3 * * *'; // Setiap 3 jam
      break;
    // Tambahkan case sesuai dengan preferensi lainnya
    default:
      scheduleRule = '0 * * * *'; // Default: setiap jam
  }

  // Atur jadwal notifikasi
  const job = schedule.scheduleJob(scheduleRule, function() {
    console.log('Reminder: Time to drink water!');
  });
};

module.exports = { scheduleNotification };
