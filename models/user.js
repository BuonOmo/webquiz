require('./connection.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  answers: Number,
  goodAnswers: Number,
  goodExamAnswers: Number,
  results: "String",
  preferences: {
    domains: {},
    examAnswers: Number
  }
});

module.exports = mongoose.model('User', User);
