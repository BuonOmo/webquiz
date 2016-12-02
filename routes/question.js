var express       = require('express'),
    databaseError = require('../misc/utils').databaseError,
    controller    = require('../controllers/question');

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

router.get("/domains", (req, res) => {
  controller.getAllDomains(data => res.json(data));
});

router.get("/short", (req, res) => {
    controller.findOne((data) => {
      if (data) res.json(data)
      else {
        res.status(404);
        res.json({
          error: 'Question not found.',
          params: req.params,
          data: data
        });
      }
    }, databaseError(req, res));
});

router.get('(?:/:id)?', (req, res) => {
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

router.get("/short/domains/:domains", (req, res) => {
  var domains = req.params.domains.split(',');
  controller.findOneByDomain(domains, (data) => {
    if (data) res.json(data)
    else {
      res.status(404);
      res.json({
        error: 'Question not found.',
        params: req.params,
        data: data
      });
    }
  }, databaseError(req, res));
});

router.get("/short/:id", (req, res) => {
  controller.findOneById(req.params.id, (data) => {
    if (data) res.json(data)
    else {
      res.status(404);
      res.json({
        error: 'Question not found.',
        params: req.params,
        data: data
      });
    }
  }, databaseError(req, res));
});

router.put('', (req, res) => {
  controller.update(req.body._id, req.body, (data) => res.json(data), (data) => res.json(data));
});

router.patch('/:id/:field/:val', (req, res) => {
  var field = {};
  field[req.params.field] = req.params.val;
  controller.update(req.params.id, field, (data) => res.json(data), (data) => res.json(data));
});

router.delete('(?:/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? {} : req.params.id;
  controller.delete(
    searchParams,
    () => {
      res.status(204);
      res.end();
    },
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
