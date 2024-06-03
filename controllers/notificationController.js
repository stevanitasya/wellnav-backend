const Notification = require('../models/Notification');
const User = require('../models/User');

// Menambahkan notifikasi
exports.addNotification = async (req, res) => {
  try {
    const { title, type } = req.body;
    const userId = req.user._id;

    const notification = new Notification({
      user: userId,
      title,
      type
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mendapatkan notifikasi
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
