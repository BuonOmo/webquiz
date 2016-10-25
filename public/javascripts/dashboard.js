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
      var mean = 0;
      var table = $('tbody');
      for (var result of getLocal('results')) {
        // console.log(table.find(''))
        // avoid dividing by 0
        var currentGrade = result.goodAnswers / (result.totalAnswers || 1);
        mean += currentGrade;
        var date = new Date(result.timestamp);
        var dateFormat = date.getFullYear()        + "/"  +
                         pad(date.getMonth()+1, 2) + "/"  +
                         pad(date.getDate(),    2) + ", " +
                         pad(date.getHours(),   2) + ":"  +
                         pad(date.getMinutes(), 2);
        // comportement here is similar to the one of changeQuestion in test.js
        table.find('tr:first').clone()
             .find('.domains').html(result.domains.join(', ') || "tous").end()
             .find('.date').html(dateFormat).end()
             .find('.total-answers').html(result.totalAnswers).end()
             .find('.good-answers').html(result.goodAnswers).end()
             .find('.grade').html((currentGrade*20).toFixed(1)).end()
             .appendTo(table).show();
      }
      mean /= getLocal('results').length;
      $('.exam-grade').html((mean*20).toFixed(1) + "/20");
    }
  }

  // reset statistics
  $('#reset').click(function () {
    removeLocal('questionStatistics');
    removeLocal('results');
    printStatistics();
  });

  // load preferences
  if (getSession('preferences')) {
    $('input[name="numberOfQuestions"]').val(getSession('preferences').numberOfQuestions)
    for (var domain of getSession('preferences').domains)
      $('option[value="'+domain+'"]')[0].selected = true;
  }

  printStatistics();
})();
