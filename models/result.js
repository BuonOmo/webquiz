require('./connection.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Result = new Schema({
  domains: [String],
  timestamp: Date,
  goodAnswers: Number,
  totalAnswers: Number,
  surrender: Boolean
});

module.exports = mongoose.model('Result', Result);
