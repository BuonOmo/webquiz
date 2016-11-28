/* ================================= API FILE ==================================
 * Every request are preceded by /api. Responses can throw 404 or 500 errors.
 * At the end of this document we retrieve all answers from our pseudo database.
 *
 * List of all requests:
 * 1. GET /ask/:domains => Any randomly chosen question without answer corresponding
 * 2. GET /answer[s]/:id/:answer /ans/:id/:answer => See if answer to a question
 *                                                   is good
 */

var express            = require('express'),
    databaseError      = require('../misc/utils').databaseError,
    questionController = require('../controllers/question'),
    userController = require('../controllers/user');

var router = express.Router();

/* ===================================== 2 =====================================
 * GET /ans/:id/:answer
 * Route to get an answer. This route is made separated from the question for
 * security purpose.
 * Response format : {
 *   goodAnswerIndex: Integer,
 *   isGoodAnswer: Boolean
 * }
 */// ==========================================================================
router.get('/ans/:id/:answer', (req, res) => {
  questionController.find(
    {_id: req.params.id},
    (data) => {
      res.json({
        goodAnswerIndex: data[0].goodAnswer,
        isGoodAnswer: data[0].goodAnswer == req.params.answer
      });
    }, databaseError(req, res)
  );
});

router.get('/statistics', (req, res) => {
  userController.getStatistics((data) => res.json(data), databaseError(req, res));
});

router.delete('/statistics', (req, res) => {
  userController.clearStatistics(() => {
    res.status(204);
    res.end();
  }, databaseError(req,res));
});

router.patch('/statistics/increment', (req, res) => {
  userController.incrementStatistics(jqueryFix(req.body), () => {
    res.status(204);
    res.end();
  }, databaseError(req, res));
});

router.post('/exam/new', (req, res) => {
  userController.createNewExam(req.body.numberOfQuestions, req.body.domains);
  res.status(204);
  res.end();
})

router.post('/exam/save', (req, res) => {
  userController.saveCurrentExam(req.body);
  res.status(204);
  res.end();
})
module.exports = router;
