var model = require('../models/user');
var debug = require('../configs').debug;
var questionController = require('./question');
function controller(){
  var self = this;

  function handleData(success, error) {
    return function(err, data) {
      if (err){
        if(typeof error === "function")
          error(data);
        else
          console.error(err);
      }
      else if(typeof success === "function")
          success(data);
    }
  }

  this.find = (success, error) => {
    model.findOne({}, handleData(success, error));
  }

  this.getStatistics = (success, error) => {
    model.findOne({},
                  {_id: 0, answers: 1, goodAnswers: 1},
                  handleData(success,error));
  }

  this.clearStatistics = (success, error) => {
    model.update({}, {
      answers: 0,
      goodAnswers: 0,
      goodExamAnswers: 0
    }, handleData(success, error));
  }

  this.incrementStatistics = (toInc, success, error) => {
    model.findOne({}, (err, data) => {
      if (err) error(data);
      toInc.forEach((key) => data[key]++);
      model.update({}, data, handleData(success, error));
    });

  }

  /**
   * Check if a user has an exam ongoing
   * @param  {function} yes
   * @param  {function} no
   */
  this.inExam = (yes, no) => {
    model.findOne({}, (err, data) => {
      (err || data.currentExam) ? no() : yes();
    });
  }

  this.update = (fields, success, error) => {
    model.update({}, fields, handleData(success, error));
  }

  this.createNewExam = (numberOfQuestions, domains) => {
    if (debug)
      console.log('userController.createNewExam('+
                  numberOfQuestions+',['+domains+'])');
    if (domains && domains.length)
      questionController.findAnyByDomain(numberOfQuestions, domains, onSuccess, console.error);
    else
      questionController.findAny(numberOfQuestions, onSuccess, console.error);
    function onSuccess(questions) {
      if (debug) console.log(questions.map((e) => e._id.toString()));
      self.update({
        currentExam: {
          score: 0,
          counter: 0,
          questionIds: questions.map((e) => e._id.toString()),
          numberOfQuestions: numberOfQuestions,
          domains: domains
        }
      }, console.log, console.log);
    }
  }

}

module.exports = new controller();
