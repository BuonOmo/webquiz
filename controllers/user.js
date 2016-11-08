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

  this.update = (fields, success, error) => {
    model.update({}, fields, handleData(success, error));
  }

}

module.exports = new controller();
