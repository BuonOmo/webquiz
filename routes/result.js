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

router.get('(?:/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? null : {_id: req.params.id};
  controller.find(
    searchParams,
    (data) => {
      if (data && data.length) // check if data is not empty
        res.json( searchParams === null ? data : data.shift())
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

// router.put('', (req, res) => {
//   controller.update(req.body._id, req.body, (data) => res.json(data), (data) => res.json(data));
// });
//
// router.patch('/statistics/increment', (req, res) => {
//   controller.update(req.body, (data) => res.json(data), (data) => res.json(data));
// });

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
