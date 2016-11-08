require('./connection.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  answers: Number,
  goodAnswers: Number,
  goodExamAnswers: Number,
  results: [String],
  preferences: {
    domains: [String],
    examAnswers: Number
  },
  currentExam: {
    score: Number,
    counter: Number,
    questionId: String,
    numberOfQuestions: Number,
    domains: [String]
  }
});

module.exports = mongoose.model('User', User);
