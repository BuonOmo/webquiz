var express = require('express');
var router = express.Router();

router.get("/component/:component", function(req, res) {
  res.sendfile("public/app/"+req.params.component+"/"+req.params.component+".component.html");
});

router.get(/^\/(?!api|less-css)(\w*).*/, examRedirection, function(req, res) {
  var title = "Webquiz";
  if (typeof req.params[0] === "string" && req.params[0].length > 0)
    title+=" — "+req.params[0][0].toUpperCase() + req.params[0].slice(1);
  res.render('index', { title: title});
});

function examRedirection(req, res, next) {
  if (req.url === '/exam') next();
  else require('../controllers/user').inExam(
    () => res.redirect('/exam'),
    () => next()
  )
}

module.exports = router;
