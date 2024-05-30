const Food = require('../models/Food');
const User = require('../models/User');

const getFoodsByUserHealthCondition = async (username) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Pengguna tidak ditemukan');
  }

  const healthCondition = user.healthCondition;
  const foods = await Food.find({ healthConditions: healthCondition });
  return foods;
};

module.exports = {getFoodsByUserHealthCondition};
