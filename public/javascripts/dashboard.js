(function () {
  'use strict';

  $('#start-exam').submit(function (event) {
    event.preventDefault();
    $.post('/api/exam/new', JSON.stringify({
      domains          : $(this).find('select[name="domains"]').val(),
      numberOfQuestions: parseInt($(this).find('input[name="numberOfQuestions"]').val())
    }), function (data) {
      console.log(data);
      go('exam');
    });
  });

  /* This function has an ugly part: it should get values ONLY if needed (for
   * instance do not retrieve it after a call to delete). This could be done
   * with a parameter. it is a TODO.
   */
  function printStatistics () {
    $.get('/api/statistics', resolveStatistics);
    function resolveStatistics(statistics) {
      if (!(statistics && statistics.answers)) {
        $('.question-statistics').html('Aucune statistique pour le moment');
      } else {
        var totalCount = statistics.answers;
        var totalRatio = Math.round(( statistics.goodAnswers /
        totalCount ) * 100)
        $('.question-statistics').html(
          "Votre taux de réussite est de " + totalRatio + "% pour " +
          totalCount + " questions répondus"
        );
      }
    }
    function noResult(){
        $('.exam-statistics, .exam-mean').html('Aucune statistique pour le moment');
    }
    $.get('/api/result', resolveResults).fail(noResult);
    function resolveResults(results, header) {
      if (header === "nocontent") {
        return noResult();
      }
      var mean = 0;
      var table = $('tbody');
      for (var result of results) {
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
      mean /= results.length;
      $('.exam-mean').html(
        'La moyenne de vos notes aux examens est '+(mean*20).toFixed(1)+"/20"
      );
    }
  }

  // reset statistics
  $('#reset').click(function () {
    Promise.all([
      $.ajax({method:'DELETE', url:'/api/statistics'}),
      $.ajax({method:'DELETE', url:'/api/result'})
    ]).then(printStatistics);
  });
  printStatistics();
})();
