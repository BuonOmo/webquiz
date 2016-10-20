(function () {
  'use strict';

  $('#start-exam').submit(function (event) {
    event.preventDefault();
    setSession('preferences', {
      "domains"           : $(this).find('select[name="domains"]').val(),
      "numberOfQuestions" : $(this).find('input[name="numberOfQuestions"]').val()
    });
    go('exam');
  });

  function printStatistics(){
    if (getLocal('questionStatistics') == null) {
      $('.statistics').html('Aucune statistique pour le moment');
    } else {
      $('.statistics .total-ratio').html(
        Math.round(( getLocal('questionStatistics').goodAnswers /
        getLocal('questionStatistics').answers ) * 100)
      );
      $('.statistics .total-count').html(getLocal('questionStatistics').answers);
    }
  }

  // reset statistics
  $('#reset').click(function () {
    removeLocal('questionStatistics');
    printStatistics();
  });

  printStatistics();
})();
