var express = require('express');
var router = express.Router();


router.get('/greetings', function(req, res, next) {
  res.json({hello: 'world'});
});

module.exports = router;
