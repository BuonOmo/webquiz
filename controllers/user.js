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
      for (var key in toInc) {
        if (typeof toInc[key] === "number" &&
            ['answers', 'goodAnswers', 'goodExamAnswers'].indexOf(key) !== -1)
          data[key]+= toInc[key];
      }
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

}

module.exports = new controller();
