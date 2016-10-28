var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var Todo = new Schema({
  user_id : String,
  content : String,
  updated_at : Date
});

mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://root:w3bQu1z@ds031257.mlab.com:31257/webquiz' );
