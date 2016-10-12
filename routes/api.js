var express = require('express');
var router = express.Router();


router.get('/greetings', function(req, res, next) {
  res.json({
    hello:   'world'
  });
});


/**
 * GET /question/:id   /ask/:id
 * Route to get question
 */
router.get(/\/(question|ask)\/:id/, function(req, res, next) {
  res.json(dbAnswers[req.params.id]['question'] || {
    error: 'bad id'
  });
});


router.get('/ans(wers?)?/:id/:answer', function(req, res, next) {
  if (dbAnswers[req.params.id])
    res.json({
      goodAnswerIndex: dbAnswers[req.params.id]['goodAnswer'],
      isGoodAnswer: dbAnswers[req.params.id]['goodAnswer'] == req.params.answer
    });
  else
    res.json({
      error: 'bad id'
    });
});

// TODO: do not send goodAnswer
dbAnswers = [{
  id: 0,
  question: {
    question: "Comment vérifiez l'intégrité d'un script inséré à l'aide de la valise <script src=\"..\"> ?",
    answers: [
      "En utilisant l’attribut \"integrity\"",
      "On lit le code et on regarde si il est joli",
      "Je demande l’appel à un ami",
    ]
  },
  goodAnswer: 0
}, {
  id: 1,
  question: {
    question: "Est-il possible d'utiliser des variables globales en CSS3 ?",
    answers: [
      "Oui",
      "Peut-être",
      "Non",
      "Tabarnak, le web c'est pas fait pour moi !",
    ]
  },
  goodAnswer: 0
}];

module.exports = router;
