require('./connection.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Question = new Schema({
  domain: String,
  question: String,
  answers: [String],
  goodAnswer: Number
});

module.exports = mongoose.model('Question', Question);
