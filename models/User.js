const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const healthConditions = [
  'GERD',
  'Diabetes',
  'Asam Urat',
  'Darah tinggi'
];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18, max: 120, required: true },
  healthCondition: { type: String, required: true, enum: healthConditions },
});

// Plugin auto-increment
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
