/* ================================= API FILE ==================================
 * Every request are preceded by /api. Responses can throw 404 or 500 errors.
 * At the end of this document we retrieve all answers from our pseudo database.
 *
 * List of all requests:
 * 1. GET /question/random/:domains /ask/rand/:domains => Any question,
 * 2. GET /question/id/:id /ask/id/:id => A specific question,
 * 3. GET /answer[s]/:id/:answer /ans/:id/:answer => Answer to a question.
 */

var express = require('express')
    fs      = require('fs');

var router = express.Router();


/* ===================================== 1 =====================================
 * GET /question/random/:domains /ask/rand/:domains
 * Route to get any question in some specific domains (domains must be comma
 * separated). If domain is ommited, the question will be picked from all the
 * database without filter.
 * Response format : {
 *   question: String,
 *   answer: Array[String]
 * }
 */// ==========================================================================
router.get(["/question/random/(:domains)?", "/ask/rand/(:domains)?"],
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


/* ===================================== 2 =====================================
 * GET /question/id/:id /ask/id/:id
 * Route to get a specific question using its ID. ID is mandatory
 * Response format : {
 *   domain: String,
 *   question: String,
 *   answer: Array[String]
 * }
 */// ==========================================================================
router.get(["/question/id/:id", "/ask/id/:id"], function(req, res) {
  var ans = dbAnswers[req.params.id]
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

/* =================================== MODEL ===================================
 * Retrieve answers from pseudo database using fs and a simple json file.
 * help from stackoverflow: http://stackoverflow.com/a/10011078/6320039
 */
var dbAnswers;
fs.readFile('database/answers.json','utf8', function (err, data) {
  if (err) throw err;
  dbAnswers = JSON.parse(data);
});

/* Below, a function that returns a JSON of the good format of question to the
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
 */
function questionJSON(dbQuestion) {
    return {
      id:       dbQuestion.id,
      domain:   dbQuestion.domain,
      question: dbQuestion.question,
      answers:  dbQuestion.answers
    }
}



module.exports = router;
