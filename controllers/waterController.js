const WaterLog = require('../models/WaterTracking'); 

// Add water log
exports.addWaterLog = async (req, res) => { 
  try {
    const { amount, date } = req.body;
    const userId = req.user._id;

    const waterLog = new WaterLog({
      user: userId,
      amount,
      date: date || Date.now()
    });

    await waterLog.save();
    res.status(201).json(waterLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get today's water logs
exports.getTodayWaterLogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);

    const waterLogs = await WaterLog.find({
      user: userId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const totalAmount = waterLogs.reduce((total, log) => total + log.amount, 0);

    res.json({ waterLogs, totalAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};