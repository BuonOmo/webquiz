var model = require('../models/question');

function controller(){

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

  this.save = (questionData, success, error) => {
    var question = new model(questionData);
    question.save(handleData(success, error));
  }

  this.find = (data, success, error) => {
    model.find(data, handleData(success, error));
  }

  this.update = (id, fields, success, error) => {
    model.update({_id: id}, fields, handleData(success, error));
  }

  this.findOne = (success, error) => {
    model.findRandom(
      {},
      {goodAnswer: 0},
      {limit: 1},
      (err, data) => handleData(success, error)(err, data[0])
    );
  }

  this.findOneById = (id, success, error) => {
    model.findOne({_id: id}, handleData(success, error));
  }

  this.findOneByDomain = (domains, success, error) => {
    model.findRandom(
      { domain: { $in: domains } },
      {goodAnswer: 0},
      {limit: 1},
      (err, data) => handleData(success, error)(err, data[0])
    );
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
        return value.length > 0 && value.reduce((prev, curr) => {
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
