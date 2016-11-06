var configs = require('../configs');
var mongoose = require('mongoose');



mongoose.connect(configs.database.url);
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('connection to the database established');
});
