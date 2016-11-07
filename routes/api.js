/* ================================= API FILE ==================================
 * Every request are preceded by /api. Responses can throw 404 or 500 errors.
 * At the end of this document we retrieve all answers from our pseudo database.
 *
 * List of all requests:
 * 1. GET /question/(:id)? => get a question by id, or all questions
 * 2. GET /ask/:domains => Any question,
 * 3. GET /answer[s]/:id/:answer /ans/:id/:answer => Answer to a question.
 * 4. POST /question => create a new question
 */

var express = require('express')
    fs      = require('fs'),
    questionController = require('../controllers/question');

var router = express.Router();


/* ===================================== 1 =====================================
 * GET /question/(:id)?
 * Route to get a specific question using its ID. ID is mandatory and is a
 * number. If not given, this will be redirected to request 2 (/ask/:domains)
 * Response format : {
 *   domain: String,
 *   question: String,
 *   answer: Array[String]
 * }
 */// ==========================================================================
router.get("/question(/:id)?", (req, res) => {
  var searchParams = req.params.id == null ? null : {_id: req.params.id};
  questionController.find(
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

/* ===================================== 2 =====================================
 * GET /ask/:domains
 * Route to get any question in some specific domains (domains must be comma
 * separated). If domain is ommited, the question will be picked from all the
 * database without filter.
 * Response format : {
 *   question: String,
 *   answer: Array[String]
 * }
 */// ==========================================================================
router.get(["/ask(/:domains)?"],
           (req, res) => {
  if (req.params.domains) {
    var domains = req.params.domains.split(',');
    var ansList = dbAnswers.filter((element) => {
      return domains.indexOf(element.domain) != -1;
    });
  } else {
    ansList = dbAnswers;
  }
  var index = Math.floor(Math.random()*ansList.length);
  var ans = ansList[index];
  if (ans)
    res.json(questionJSON(ans));
  else {
    res.status(404);
    res.json({
      error: 'No question in these domains.',
      params: req.params
    });
  }
});


/* ===================================== 3 =====================================
 * GET /answers/:id/:answer /answer/:id/:answer /ans/:id/:answer
 * Route to get an answer. This route is made separated from the question for
 * security purpose.
 * Response format : {
 *   goodAnswerIndex: Integer,
 *   isGoodAnswer: Boolean
 * }
 */// ==========================================================================
router.get('/ans(wers?)?/:id/:answer', (req, res) => {
  if (dbAnswers[req.params.id])
    res.json({
      goodAnswerIndex: dbAnswers[req.params.id]['goodAnswer'],
      isGoodAnswer: dbAnswers[req.params.id]['goodAnswer'] == req.params.answer
    });
  else {
    res.status(404);
    res.json({
      error: 'Answer not found.',
      params: req.params
    });
  }
});

/* ===================================== 4 =====================================
 * POST /question
 * Route to create a question
 * Response format : see question format (db.js)
 */// ==========================================================================
router.post('/question', (req, res) => {
  if (questionController.verify(req.body)) {
    questionController.save(req.body, (data) => {
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


/* ===================================== 6 =====================================
 * DELETE /question/:id
 * Route to delete a question using its id
 * Response format : see question format (db.js)
 */// ==========================================================================
router.delete('/question(/:id)?', (req, res) => {
  var searchParams = req.params.id == null ? {} : req.params.id;
  questionController.delete(searchParams, () => res.end(), (data) => {
    res.status(500);
    res.json({
      error: "DB: error retrieving questions",
      params: req.params,
      data: data
    });
  })
});


module.exports = router;
