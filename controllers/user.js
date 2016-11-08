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

  this.find = (data, success, error) => {
    model.find(data, handleData(success, error));
  }

  this.update = (id, fields, success, error) => {
    model.update({_id: id}, fields, handleData(success, error));
  }

}

module.exports = new controller();
