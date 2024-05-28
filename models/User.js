const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const foodConsumptionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    required: true
  },
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
  calories: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  healthCondition: { 
    type: [String], 
    enum: ['GERD', 'Diabetes', 'Asam Urat', 'Darah tinggi'], 
    required: true 
  },
  foodConsumption: [foodConsumptionSchema],
  favoriteFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
