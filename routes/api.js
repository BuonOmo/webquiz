var express = require('express');
var fs = require('fs');
var router = express.Router();

/**
 * GET /question/random/:domains   /ask/rand/:domains
 * Route to get any question in specific domains (domains must be comma
 * separated)
 * Response format : {
 *   question: String,
 *   answer: Array[String]
 * }
 */
router.get(["/question/random/(:domains)?", "/ask/rand/(:domains)?"], function(req, res) {
  if (req.params.domains) {
    var domains = req.params.domains.split(',');
    var ansList = dbAnswers.filter(function (element) {
      return domains.indexOf(element.domain) != -1;
    });
  }
  else {
    ansList = dbAnswers;
  }
  var index = Math.floor(Math.random()*ansList.length);
  var ans = ansList[index];
  if (ans)
    res.json({
      domain: ans.domain,
      question: ans.question,
      answers: ans.answers
    });
  else {
    res.status(500);
    res.json({
      error: 'No question in these domains.'
    });
  }
});


/**
 * GET /question/id/:id   /ask/id/:id
 * Route to get a specific question using its ID
 * Response format : {
 *   domain: String,
 *   question: String,
 *   answer: Array[String]
 * }
 */
router.get(["/question/id/:id", "/ask/id/:id"], function(req, res) {
  var ans = dbAnswers[req.params.id]
  if (ans)
    res.json({
      domain: ans.domain,
      question: ans.question,
      answer: ans.answer
    });
  else {
    res.status(500);
    res.json({
      error: 'Bad ID.'
    });
  }
});

/**
 * GET /answers/:id/:answer   /answer/:id/:answer   /ans/:id/:answer
 * Route to get answer
 * Response format : {
 *   goodAnswerIndex: Integer,
 *   isGoodAnswer: Boolean
 * }
 */
router.get('/ans(wers?)?/:id/:answer', function(req, res) {
  if (dbAnswers[req.params.id])
    res.json({
      goodAnswerIndex: dbAnswers[req.params.id]['goodAnswer'],
      isGoodAnswer: dbAnswers[req.params.id]['goodAnswer'] == req.params.answer
    });
  else {
    res.status(500);
    res.json({
      error: 'bad id'
    });
  }
});

/*
help from :
http://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory#10011078
*/
var dbAnswers;
fs.readFile('database/answers.json','utf8', function (err, data) {
  if (err) throw err;
  dbAnswers = JSON.parse(data);
});

module.exports = router;
