var express = require('express');
var less = require('express-less');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var apiQuestion = require('./routes/question');
var apiUser = require('./routes/user');
var apiResult = require('./routes/result');

var app = express();

// ----------------------------- SWAGGER CONFIG ----------------------------- //
// var argv       = require('minimist')(process.argv.slice(2));
// var swagger    = require("swagger-node-express");
// var bodyParser = require( 'body-parser' );
//
// var subpath = express();
// app.use(bodyParser());
// app.use("/doc", subpath);
// swagger.setAppHandler(subpath);
//
// app.use(express.static('dist'));
//
// subpath.get('/', function (req, res) {
//     res.sendFile(__dirname + '/dist/index.html');
// });
//
// // Set api-doc path
// swagger.configureSwaggerPaths('', 'api-docs', '');

// // Configure the API domain
// var domain = 'localhost';
// if (argv.domain !== undefined) domain = argv.domain;
// else
//   console.log('No --domain=xxx specified, taking default hostname "'+domain+'".')
//
// // Configure the API port
// var port = 3000;
// if (argv.port !== undefined) port = argv.port;
// else console.log('No --port=xxx specified, taking default port ' + port + '.')
//
// // Set and display the application URL
// var applicationUrl = 'http://' + domain + ':' + port;
// console.log('snapJob API running on ' + applicationUrl);
//
// swagger.configure(applicationUrl, '1.0.0');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/api/question', apiQuestion);
app.use('/api/user', apiUser);
app.use('/api/result', apiResult);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/jquery.min.js'))
app.use('/modernizr', express.static(__dirname + '/public/javascripts/modernizr.min.js'))
app.use('/less-css', less(
    path.join(__dirname, 'style'),
    { debug: app.get('env') == 'development' }
  )
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
