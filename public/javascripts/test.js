(function () {
  'use strict';

  /**
   * id represents the 'data-id' html element that you can find in test.pug.
   * Here it can be 'quick-test' or 'exam'
   * more here: http://stackoverflow.com/a/32589923/6320039
   */
  var id = document.currentScript.getAttribute('data-id');

  // JQuery quick access to important nodes
  var $domain   = $('#domain');
  var $question = $('#question');
  var $answers  = $('#answers');
  var $nextQuestion = $('#next-question');
  var $dashboard = $('#dashboard');
  if (id == 'exam') var counter = 0;

  function changeQuestion() {
    var url;
    if (id == 'exam') {
      if (++counter == sessionStorage.numberOfQuestions)
        $nextQuestion.find('span').html('Fin de l’examen');
      else if (counter > sessionStorage.numberOfQuestions) {
        window.location.href = window.location.href.replace(/exam.*$/,'result');
        exit();
      }
      url = "/api/ask/rand/" + sessionStorage.domains;
    } else {
      url = "/api/ask/rand/";
    }
    $.get(url)
      .done(function(data) {
        $domain.html(data.domain);
        $question.html(data.question);
        // clean everything except first answer (bones)
        $answers.find('.answer:not(:first)').remove()
        for (var answer of data.answers) {
          $answers
            // clone body of an answer
            .find('.answer:first')
            .clone()
            // append current answer elements to the clone
            .find('input')
              .attr('name', answer)
            .end()
            .find('label')
              .attr('for', answer)
              .html(answer)
            .end()
            // append the clone to DOM (#answer)
            .appendTo($answers)
            // show the clone
            .show();
        }
      })
      .fail(function (data) {
        console.log(data);
      });
    }

    $(document).ready(changeQuestion);
    $nextQuestion.click(changeQuestion);
})();
