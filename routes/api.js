/* ================================= API FILE ==================================
 * Every request are preceded by /api. Responses can throw 404 or 500 errors.
 * At the end of this document we retrieve all answers from our pseudo database.
 *
 * List of all requests:
 * 1. GET /ask/:domains => Any question without answer corresponding
 * 3. GET /answer[s]/:id/:answer /ans/:id/:answer => See if answer to a question
 *                                                   is good
 */

var express = require('express')
    questionController = require('../controllers/question');

var router = express.Router();



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


module.exports = router;
