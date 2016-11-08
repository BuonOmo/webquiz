var model = require('../models/result');

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

  this.findLast = (success, error) => {
    model.findOne(handleData(success, error))
         .sort({ timestamp: -1 })
  }

  this.update = (data, success, error) => {
    model.update(data, handleData(success, error));
  }

  this.delete = (data, success, error) => {
    model.remove(data, handleData(success, error));
  }
}
module.exports = new controller();
