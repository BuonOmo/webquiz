(function () {
  'use strict';

  $('#start-exam').submit(function (event) {
    event.preventDefault();
    setSession('domains', $(this).find('select[name="domains"]').val());
    setSession('numberOfQuestions', $(this).find('input[name="numberOfQuestions"]').val());
  });

})();
