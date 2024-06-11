const User = require('../models/User');
const Food = require('../models/Food');

// Add food consumption
exports.addFoodConsumption = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { mealType, foodIds } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const foods = await Food.find({ _id: { $in: foodIds } });
    const healthConditions = user.healthCondition;

    let totalCalories = 0;
    let totalCarbs = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let isFoodSafe = true;

    foods.forEach(food => {
      totalCalories += food.calories;
      totalCarbs += food.carbohydrates;
      totalProtein += food.protein;
      totalFat += food.fat;
      
      if (food.healthConditions.some(cond => healthConditions.includes(cond))) {
        isFoodSafe = false;
      }
    });

    if (!isFoodSafe) {
      return res.status(400).json({ error: "The food you eat is not good for your current health condition" });
    }

    const today = new Date().toISOString().split('T')[0];
    let dailyConsumption = user.foodConsumption.find(fc => fc.date.toISOString().split('T')[0] === today && fc.mealType === mealType);

    if (dailyConsumption) {
      dailyConsumption.foods = [...dailyConsumption.foods, ...foodIds];
      dailyConsumption.calories += totalCalories;
      dailyConsumption.carbohydrates += totalCarbs;
      dailyConsumption.protein += totalProtein;
      dailyConsumption.fat += totalFat;
    } else {
      user.foodConsumption.push({
        date: new Date(),
        mealType,
        foods: foodIds,
        calories: totalCalories,
        carbohydrates: totalCarbs,
        protein: totalProtein,
        fat: totalFat
      });
    }

    await user.save();
    res.json(user.foodConsumption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get food consumption
exports.getTodayFoodLogs = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const foodLogs = await FoodLog.find({
      userId: req.user._id,
      date: { $gte: today }
    });

    res.status(200).json(foodLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
