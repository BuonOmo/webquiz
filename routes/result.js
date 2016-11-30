var express       = require('express'),
    databaseError = require('../misc/utils').databaseError,
    controller    = require('../controllers/result');

var router = express.Router();


router.post('', (req, res) => {
    controller.save(req.body, (data) => {
      res.status(201);
      res.json(data);
    }, databaseError(req, res));
});

router.get('/last', (req, res) => {
  controller.findLast(
    (data) => {
      if (data) // check if data is not empty
        res.json(data)
      else {
        res.status(404);
        res.json({
          error: 'Result not found.',
          params: req.params,
          data: data
        });
      }
    }, databaseError(req, res)
  );
});

router.get(':id', (req, res) => {
  controller.findOneById(
    req.params.id,
    (data) => {
      if (data) res.json(data);
      else {
        res.status(404);
        res.json({
          error: 'Result not found.',
          params: req.params,
          data: data
        });
      }
    }, databaseError(req, res)
  );
});

router.get('', (req, res) => {
  controller.all(
    (data) => {
      if (data) {
        res.json(data);
      }
      else {
        res.status(404);
        res.json({
          error: 'Result not found.',
          params: req.params,
          data: data
        });
      }
    }, databaseError(req, res)
  );
});

router.delete('(?:/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? {} : req.params.id;
  controller.delete(
    searchParams,
    (data) => {
      res.status(204);
      res.json(data);
    }, databaseError(req,res));
});

module.exports = router;
