var model = require('../models/user');

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

  this.find = (success, error) => {
    model.findOne({}, handleData(success, error));
  }

  this.getStatistics = (success, error) => {
    model.findOne({},
                  {_id: 0, answers: 1, goodAnswers: 1},
                  handleData(success,error));
  }
  this.clearStatistics = () => {
    model.update({}, {
      answers: 0,
      goodAnswers: 0,
      goodExamAnswers: 0
    }).exec();
  }

  this.update = (fields, success, error) => {
    model.update({}, fields, handleData(success, error));
  }

}

module.exports = new controller();
