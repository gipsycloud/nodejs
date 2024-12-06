const mongoose = require('mongoose');
const caseSchema = mongoose.Schema({
  count: Number,
  date: String
})
const coronaSchema = new mongoose.Schema({
  country: String,
  total_cases: Number,
  new_cases: [caseSchema],
  total_deaths: Number,
  new_deaths: [caseSchema],
  total_recovered: Number,
  active_cases: Number,
  serious_critical: Number,
});

module.exports = mongoose.model('Coronas', coronaSchema)