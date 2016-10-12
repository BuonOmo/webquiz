(function () {
  'use strict';

  /**
   * id represents the 'data-id' html element that you can find in test.pug.
   * Here it can be 'quick-test' or 'exam'
   * more here: http://stackoverflow.com/a/32589923/6320039
   */
  var id = document.currentScript.getAttribute('data-id');

  var questionData;

  $.get("/api/ask/rand/")
    .done(function(data) {
      questionData = data;
      console.log(questionData);
      $('#domain').html(questionData.domain);
      $('#question').html(questionData.question);
      var answers = $('#answers');
      for (var answer of questionData.answers) {
        answers
          .find('.answer:last')
          .clone()
          .find('input')
            .attr('name', answer)
          .end()
          .find('label')
            .attr('for', answer)
            .html(answer)
          .end()
          .appendTo(answers)
          .show();
      }
    })
    .fail(function (data) {
      console.log(data);
    });

})();
