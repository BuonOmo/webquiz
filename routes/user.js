var express       = require('express'),
    databaseError = require('../misc/utils').databaseError,
    jqueryFix     = require('../misc/utils').jqueryFix,
    controller    = require('../controllers/user');

var router = express.Router();

router.get('', (req, res) => {
  controller.find((data) => res.json(data), databaseError(req, res));
});

router.patch('', (req, res) => {
  controller.update(jqueryFix(req.body), (data) => {
    if (!(data && data.ok))
      res.status(400);
    res.end();
  }, databaseError(req, res));
});


module.exports = router;
