var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Question = new Schema({
  domain: String,
  question : String,
  answers : [String, String, String, String],
  goodAnswer: Number
});

var Usager = new Schema({
  name: String,
  totalAnswer : Number,
  goodAnswer: Number
});

mongoose.model( 'Question', Question );
mongoose.model( 'Usager', Usager );
mongoose.connect( 'mongodb://root:w3bQu1z@ds031257.mlab.com:31257/webquiz');
