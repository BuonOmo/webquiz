var express    = require('express')
    controller = require('../controllers/question');

var router = express.Router();


router.post('', (req, res) => {
  if (controller.verify(req.body)) {
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
  } else {
    res.status(400);
    res.json({
      error: 'Data verification failed',
      params: req.params
    });
  }
});

router.get('(/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? null : {_id: req.params.id};
  controller.find(
    searchParams,
    (data) => res.json( searchParams === null ? data : data.shift()),
    (data) => {
      res.status(404);
      res.json({
        error: 'Answer not found.',
        params: req.params,
        data: data
      });
    }
  );
});

router.put('/:id', (req, res) => {
  // TODO
});

router.patch('/:id', (req, res) => {
  // TODO
});

router.delete('(/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? {} : req.params.id;
  controller.delete(
    searchParams,
    () => res.end(),
    (data) => {
    res.status(500);
    res.json({
      error: "DB: error retrieving questions",
      params: req.params,
      data: data
    });
  });
});

module.exports = router;
