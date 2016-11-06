var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Question = new Schema({
  domain: String,
  question : String,
  answers : [String],
  goodAnswer: Number
});

var User = new Schema({
  name: String,
  answers : Number,
  goodAnswers: Number,
  examAnswers: Number,
  goodExamAnswers: Number,
  results: [ObjectId]
});

var Result = new Schema({
  domains: [String],
  timestamp: Timestamp,
  goodAnswers: Number,
  totalAnswers: Number,
  surrender: Boolean
});

mongoose.model( 'Question', Question );
mongoose.model( 'User', User );
mongoose.model( 'Result', Result );
mongoose.connect( 'mongodb://root:w3bQu1z@ds031257.mlab.com:31257/webquiz');
