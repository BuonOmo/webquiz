require('./connection.js');

var mongoose = require('mongoose'),
    random   = require('mongoose-simple-random');

var Question = new mongoose.Schema({
  domain: String,
  question: String,
  answers: [String],
  goodAnswer: Number
});

Question.plugin(random);

module.exports = mongoose.model('Question', Question);
