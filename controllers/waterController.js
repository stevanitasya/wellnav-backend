const WaterTracking = require('../models/WaterTracking');

exports.getWaterIntake = async (req, res) => {
  try {
    const userId = req.user.id;
    const waterLogs = await WaterTracking.find({ userId });
    res.json(waterLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addWaterIntake = async (req, res) => {
    try {
      const userId = req.user.id;
      const { water, hour, minutes } = req.body;
  
      const waterLog = new WaterTracking({ userId, water, hour, minutes });
      await waterLog.save();
  
      res.status(201).json(waterLog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};