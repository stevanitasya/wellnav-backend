const mongoose = require('mongoose');

const healthConditions = [
  'GERD',
  'Diabetes',
  'Asam Urat',
  'Darah tinggi'
];

const HealthConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('HealthCondition', HealthConditionSchema);
