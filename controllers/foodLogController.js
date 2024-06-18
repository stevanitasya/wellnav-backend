const FoodLog = require('../models/FoodLog');
const Food = require('../models/Food');

exports.addFoodLog = async (req, res) => {
  try {
    const { foodId, mealType } = req.body;
    const userId = req.user._id; // Use the authenticated user's ID

    // Validate food
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Create food log
    const foodLog = new FoodLog({
      userId,
      foodId,
      mealType,
    });

    await foodLog.save();
    res.status(201).json(foodLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFoodLogsByDate = async (req, res) => {
  try {
    const userId = req.user._id; // Use the authenticated user's ID
    const { date } = req.params;

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

    // Filter out logs with null foodId
    const validFoodLogs = foodLogs.filter(log => log.foodId);

    const nutritionSummary = validFoodLogs.reduce((acc, log) => {
      acc.calories += log.foodId.calories || 0;
      acc.carbohydrates += log.foodId.carbohydrates || 0;
      acc.protein += log.foodId.protein || 0;
      acc.fat += log.foodId.fat || 0;
      return acc;
    }, { calories: 0, carbohydrates: 0, protein: 0, fat: 0 });

    console.log("Nutrition Summary:", nutritionSummary); // Debug: Log nutrition summary

    res.json({ foodLogs: validFoodLogs, nutritionSummary });
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
};



