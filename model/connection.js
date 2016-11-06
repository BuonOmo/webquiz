var mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://root:w3bQu1z@ds031257.mlab.com:31257/webquiz');
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function(){
  console.log('connection to the database established');
});
