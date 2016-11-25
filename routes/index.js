var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/templates/:template', function(req, res, next) {
  console.log('log me bitch');
  res.render('templates/' + req.params.template + ".pug");
});

router.get('/layouts/:layout', function(req, res, next) {
  res.render('layouts/' + req.params.layout + "/" + req.params.layout + ".pug");
});

module.exports = router;
