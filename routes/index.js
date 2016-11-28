var express = require('express');
var router = express.Router();

router.get(/^\/(?!api|less-css)(\w*).*/, function(req, res) {
  var title = "Webquiz";
  if (typeof req.params[0] === "string" && req.params[0].length > 0)
    title+=" — "+req.params[0][0].toUpperCase() + req.params[0].slice(1);
  res.render('index', { title: title});
});

module.exports = router;
