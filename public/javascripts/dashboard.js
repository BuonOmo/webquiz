(function () {
  'use strict';
  
  $('#start-exam').submit(function (event) {
    event.preventDefault();
    if (Modernizr.sessionstorage) {
      sessionStorage.domains = $(this).find('select[name="domains"]').val();
      sessionStorage.numberOfQuestions = $(this).find('input[name="numberOfQuestions"]').val();
    }
    else {
      console.log('Your browser is too old, some functionalities may not work');
    }
  });

})();
