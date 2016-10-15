(function () {
  'use strict';

  // --------------------------------------------------- variable initialisation
  /*
   * HACK: we are passing a parameter to this scripts through a data-* balise.
   * more here: http://stackoverflow.com/a/32589923/6320039
   */
  var isExam = 'exam' == document.currentScript.getAttribute('data-id');

  // JQuery quick access to important nodes
  var $domain       = $('#domain');
  var $question     = $('#question');
  var $answers      = $('#answers');
  var $nextQuestion = $('#next-question');
  var $dashboard    = $('#dashboard');

  if (isExam) var counter = 0;

  // ---------------------------------------------------- main logic (functions)
  /**
   * Change DOM elements relative to a question :
   *  - question
   *  - domain
   *  - answers
   *
   * The question is randomly retrieved from the database. If the global
   * parameter isExam is set, then the question can be only in domains
   * contained in sessionStorage.domains; and it also increment the counter.
   * If the counter is greater than sessionStorage.numberOfQuestions, then exam
   * is over and window is redirected to /result.
   * @return undefined
   */
  function changeQuestion() {
    var url;
    if (isExam) {
      if (++counter == sessionStorage.numberOfQuestions)
        $nextQuestion.find('span').html('Fin de l’examen');
      else if (counter > sessionStorage.numberOfQuestions) {
        window.location = '/result';
        return;
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


    function reload() {
      changeQuestion();
      // function here
    }
    // ------------------------------------------------------------- DOM binding
    $(document).ready(reload);
    $nextQuestion.click(reload);
})();
