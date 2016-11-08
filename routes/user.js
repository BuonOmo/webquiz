var express    = require('express')
    controller = require('../controllers/user');

var router = express.Router();

router.get('(/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? null : {_id: req.params.id};
  controller.find(
    searchParams,
    (data) => res.json( searchParams === null ? data : data.shift()),
    (data) => {
      res.status(404);
      res.json({
        error: 'User not found.',
        params: req.params,
        data: data
      });
    }
  );
});

router.put('', (req, res) => {
  controller.update(req.body._id, req.body, (data) => res.json(data), (data) => res.json(data));
});

router.patch('/:id/:field/:val', (req, res) => {
  var field = {};
  field[req.params.field] = req.params.val;
  controller.update(req.params.id, field, (data) => res.json(data), (data) => res.json(data));
});


module.exports = router;
