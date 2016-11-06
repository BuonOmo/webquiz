(function(){
  'use strict';

  var minAnswers = 2;
  var maxAnswers = 4;

  var answerCount = 2;

  function deleteAnswer() {
    if (answerCount <= minAnswers){
      return false;
    }
    answerCount--;
    $(this).parent().remove();
    $('.answers').children().each(function (index, element){
        $(element)
          .find('label')
            .attr('for','answers-'+(index+1))
            .html('Réponse '+(index+1))
            .end()
          .find('input')
            .first()
              .attr('id','answers-'+(index+1))
              .end()
            .last()
              .val(index)
    });
  }

  $('.delete').click(deleteAnswer);

  $('.add').click(function(){
    if (answerCount >= maxAnswers) {
      return false;
    }
    answerCount++;
    $('<div>')
      .append(
        $('<label>')
          .attr('for',"answer-"+answerCount)
          .html("Réponse "+answerCount)
      ).append(
        $('<input required>').attr('id',"answer-"+answerCount).attr('name','answers[]')
      )
      .append('<input type="radio" name="goodAnswer" value="'+(answerCount-1)+'" required>')
      .append('<a class="delete"><i class="material-icons">delete</i></a>')
      .find('.delete').click(deleteAnswer).end()
      .appendTo('.answers')
  });

  $('form').submit(function (e){
    e.preventDefault();
    var domain = $(this).find('#domain').val();
    var question = $(this).find('#question').val();
    var answers = $(this).find('[name="answers[]"]').map(function(){ return this.value }).get();
    var goodAnswer = $('[name="goodAnswer"]').filter(function(){ return this.checked }).val();
    var data = {
      domain: domain,
      question: question,
      answers: answers,
      goodAnswer: goodAnswer
    };
    $.post('/api/question', data, log, 'json');
    function log(data){ console.log("Question envoyée") }

  });

})();
