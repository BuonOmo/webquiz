/* ================================= API FILE ==================================
 * Every request are preceded by /api. Responses can throw 404 or 500 errors.
 * At the end of this document we retrieve all answers from our pseudo database.
 *
 * List of all requests:
 * 1. GET /question/:id /ask/:id => A specific question,
 * 2. GET /question/:domains /ask/:domains => Any question,
 * 3. GET /answer[s]/:id/:answer /ans/:id/:answer => Answer to a question.
 * 4. POST /question => create a new question
 */

var express = require('express')
    fs      = require('fs');

var router = express.Router();


/* ===================================== 1 =====================================
 * GET /question/:id /ask/:id
 * Route to get a specific question using its ID. ID is mandatory and is a
 * number. If not given, this will be redirected to request 2 (/ask/:domains)
 * Response format : {
 *   domain: String,
 *   question: String,
 *   answer: Array[String]
 * }
 */// ==========================================================================
router.get(/\/(?:question|ask)\/(\d+)/, function(req, res) {
  var ans = dbAnswers[req.params[0]]
  if (ans)
    res.json(questionJSON(ans));
  else {
    res.status(404);
    res.json({
      error: 'Answer not found.',
      params: req.params
    });
  }
});

/* ===================================== 2 =====================================
 * GET /question/:domains /ask/:domains
 * Route to get any question in some specific domains (domains must be comma
 * separated). If domain is ommited, the question will be picked from all the
 * database without filter.
 * Response format : {
 *   question: String,
 *   answer: Array[String]
 * }
 */// ==========================================================================
router.get(["/question/(:domains)?", "/ask/(:domains)?"],
           function(req, res) {
  if (req.params.domains) {
    var domains = req.params.domains.split(',');
    var ansList = dbAnswers.filter(function (element) {
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
router.get('/ans(wers?)?/:id/:answer', function(req, res) {
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
router.post('/question', function(req, res) {
  var minQuestions = 2
  var qu = req.body;

  function verify(value) {
    if (Array.isArray(value)) {
      return value.length > 0 && value.reduce(function(prev, curr){
        return prev ? (typeof curr === "string" && curr.length > 0) : false;
      }, true);
    }
    return value != null && (value.length > 0 || typeof value === "number");
  }

  if (typeof qu.question   === "string" && verify(qu.question) &&
      typeof qu.domain     === "string" && verify(qu.domain) &&
      typeof qu.answers    === "object" && verify(qu.answers) &&
      qu.answers.length >= minQuestions &&
      typeof qu.goodAnswer === "number" && verify(qu.goodAnswer)) {
    res.send('cool');
  } else {
    res.status(400);
    res.send('pas cool');
  }
});

/* =================================== MODEL ===================================
 * Retrieve answers from pseudo database using fs and a simple json file.
 * help from stackoverflow: http://stackoverflow.com/a/10011078/6320039
 */
var dbAnswers;
fs.readFile('database/answers.json','utf8', function (err, data) {
  if (err) throw err;
  dbAnswers = JSON.parse(data);
});

/**
 * This function returns a JSON of the good format of question to the
 * client using format from the database.
 * Return format:
 * {
 *   "id"       : 0,
 *   "domain"   : "LIFE",
 *   "question" : "To be or not to be ?",
 *   "answers"  : [
 *     "To be",
 *     "Not to be"
 *   ]
 * }
 * @return {object}
 */
function questionJSON(dbQuestion) {
    return {
      id:       dbQuestion.id,
      domain:   dbQuestion.domain,
      question: dbQuestion.question,
      answers:  dbQuestion.answers
    }
}

/* This function returns a JSON of the good format of answer to the
 * client using format from the database.
 * Return format:
 * {
 *   "id"       : 0,
 *   "domain"   : "LIFE",
 *   "question" : "To be or not to be ?",
 *   "answers"  : [
 *     "To be",
 *     "Not to be"
 *   ]
 * }
 * @return {object}
 */
// function questionJSON(dbQuestion) {
//     return {
//       id:       dbQuestion.id,
//       domain:   dbQuestion.domain,
//       question: dbQuestion.question,
//       answers:  dbQuestion.answers
//     }
// }

module.exports = router;
