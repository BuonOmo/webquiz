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

  function printStatistics () {


    // first stats: about questions
    if (getLocal('questionStatistics') == null) {
      $('.question-statistics').html('Aucune statistique pour le moment');
    } else {
      var totalCount = getLocal('questionStatistics').answers;
      var totalRatio = Math.round(( getLocal('questionStatistics').goodAnswers /
                                    totalCount ) * 100)
      $('.question-statistics .total-ratio').html(totalRatio);
      $('.question-statistics .total-count').html(totalCount);
    }

    // exam grades
    if(getLocal('results') == null) {
      $('.exam-statistics').html('Aucune statistique pour le moment');
    } else {
      var examGrade = 0;
    }
  }

  // reset statistics
  $('#reset').click(function () {
    removeLocal('questionStatistics');
    printStatistics();
  });

  printStatistics();
})();
