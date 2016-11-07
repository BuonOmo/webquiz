var model = require('../models/question');

function controller(){

  function handleData(success, error) {
    return function(err, data) {
      if (err) error(data);
      else success(data);
    }
  }

  this.save = (questionData, success, error) => {
    var question = new model(questionData);
    question.save(handleData(success, error));
  }

  this.find = (data, success, error) => {
    model.find(data, handleData(success, error));
  }

  this.delete = (data, success, error) => {
    model.remove(data, handleData(success, error));
  }

  this.verify = (question) => {
    var minQuestions = 2;
    if (question["answers[]"])
      question.answers = question["answers[]"];
    if (typeof question.goodAnswer !== "number")
      question.goodAnswer = parseInt(question.goodAnswer);
    function verify(value) {
      if (Array.isArray(value)) {
        return value.length > 0 && value.reduce(function(prev, curr){
          return prev ? (typeof curr === "string" && curr.length > 0) : false;
        }, true);
      }
      return value != null && (value.length > 0 || typeof value === "number");
    }

    return typeof question.question   === "string" && verify(question.question) &&
           typeof question.domain     === "string" && verify(question.domain) &&
           typeof question.answers    === "object" && verify(question.answers) &&
           question.answers.length >= minQuestions &&
           typeof question.goodAnswer === "number" && verify(question.goodAnswer)
  }
}

module.exports = new controller();
