const FoodLog = require('../models/FoodLog');
const Food = require('../models/Food'); 

exports.addFoodLog = async (req, res) => {
  try {
    const { userId, foodId, mealType, quantity } = req.body;

    // Validasi makanan
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Buat food log
    const foodLog = new FoodLog({
      userId,
      foodId,
      mealType,
      quantity
    });

    await foodLog.save();
    res.status(201).json(foodLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFoodLogsByDate = async (req, res) => {
    try {
      const { userId, date } = req.params;
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
  
      const foodLogs = await FoodLog.find({
        userId,
        date: {
          $gte: startDate,
          $lt: endDate
        }
      }).populate('foodId');
  
      const nutritionSummary = foodLogs.reduce((acc, log) => {
        acc.calories += log.foodId.calories * log.quantity;
        acc.carbs += log.foodId.carbs * log.quantity;
        acc.protein += log.foodId.protein * log.quantity;
        acc.fat += log.foodId.fat * log.quantity;
        return acc;
      }, { calories: 0, carbs: 0, protein: 0, fat: 0 });
  
      res.json({ foodLogs, nutritionSummary });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
