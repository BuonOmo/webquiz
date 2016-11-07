require('./connection.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  answers: Number,
  goodAnswers: Number,
  examAnswers: Number,
  goodExamAnswers: Number,
  results: [ObjectId]
});

module.exports = mongoose.model('User', User);
