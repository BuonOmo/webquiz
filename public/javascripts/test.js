(function () {
  'use strict';

  /**
   * id represents the 'data-id' html element that you can find in test.pug.
   * Here it can be 'quick-test' or 'exam'
   * more here: http://stackoverflow.com/a/32589923/6320039
   */
  var id = document.currentScript.getAttribute('data-id');

  var questionData;
  function changeQuestion() {
    $.get("/api/ask/rand/")
      .done(function(data) {
        questionData = data;
        $('#domain').html(questionData.domain);
        $('#question').html(questionData.question);
        var answers = $('#answers');
        // clean everything except first answer (bones)
        answers.find('.answer:not(:first)').remove()
        for (var answer of questionData.answers) {
          answers
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
              .appendTo(answers)
              // show the clone
              .show();
        }
      })
      .fail(function (data) {
        console.log(data);
      });
    }
    $(document).ready(changeQuestion);
    $('#next-question').click(changeQuestion);
})();
