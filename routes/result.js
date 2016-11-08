var express    = require('express')
    controller = require('../controllers/result');

var router = express.Router();


router.post('', (req, res) => {
    controller.save(req.body, (data) => {
      res.status(201);
      res.json(data);
    }, (data) => {
      res.status(500);
      res.json({
        error: 'DB: error on save',
        params: req.params,
        data: data
      })
    });
});

router.get('(/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? null : {_id: req.params.id};
  controller.find(
    searchParams,
    (data) => res.json( searchParams === null ? data : data.shift()),
    (data) => {
      res.status(404);
      res.json({
        error: 'Result not found.',
        params: req.params,
        data: data
      });
    }
  );
});

router.get('/last', (req, res) => {
  controller.findLast(
    (data) => res.json(data),
    (data) => {
      res.status(404);
      res.json({
        error: 'Result not found.',
        data: data
      });
    }
  );
});

router.put('', (req, res) => {
  controller.update(req.body._id, req.body, (data) => res.json(data), (data) => res.json(data));
});

router.patch('/statistics/increment', (req, res) => {
  controller.update(req.body, (data) => res.json(data), (data) => res.json(data));
});

router.delete('(/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? {} : req.params.id;
  controller.delete(
    searchParams,
    () => res.end(),
    (data) => {
    res.status(500);
    res.json({
      error: "DB: error retrieving results",
      params: req.params,
      data: data
    });
  });
});

module.exports = router;
