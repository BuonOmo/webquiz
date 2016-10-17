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

        dragndrop();
      })
      .fail(function (data) {
        console.log(data);
      });


    }

    function dragndrop(){
      var draggable = document.querySelectorAll(".answer");
      var droptarget = document.getElementById("droptarget");

      droptarget.innerHTML = "Glisser la réponse !"
      droptarget.classList.add("free");

      for(var i = 1; i < draggable.length; i++){
        (function(i){
          draggable[i].classList.add("draggable");
          draggable[i].setAttribute("draggable", "true");
          draggable[i].addEventListener('dragstart', dragStart, false);  //the user starts dragging the element
          draggable[i].addEventListener('dragend'  , dragEnd  , false);
        })(i)
      }

      droptarget.addEventListener('dragenter', dragEnter  , false); //fired when the user drags the draggable onto the drop target (only fires when the draggable element changes from being outside to being over)
      droptarget.addEventListener('dragover' , dragOver   , false); //Fired once the draggable element is over the drop target and keeps firing for as long as the draggable element is being dragged over the drop target.
      droptarget.addEventListener('dragleave', dragLeave  , false); //If the user drags the draggable object out of the drop target again, the dragleave event is fired.
      droptarget.addEventListener('drop'     , drop       , false); //If the user drops the draggable object on the drop target, the drop event is fired.

      /* Draggable event handlers */
      function dragStart(event) {
          var dataToSet = event.target.getElementsByTagName('label')[0].getAttribute('for');
          event.dataTransfer.setData("text", dataToSet); //data that is transfered to the drop target when the element is dropped. (MIME, data)

          for(var i = 1; i < draggable.length; i++){
            (function(i){
              if(document.getElementsByTagName('label')[i].getAttribute('for') == event.target.getElementsByTagName('label')[0].getAttribute('for')){
                draggable[i].classList.add("dragged");
              }
            })(i)
          }

          event.dataTransfer.effectsAllowed = "copy";
      }

      function dragEnd(event) {
        for(var i = 1; i < draggable.length; i++){
          (function(i){
            if(document.getElementsByTagName('label')[i].getAttribute('for') == event.target.getElementsByTagName('label')[0].getAttribute('for')){
              draggable[i].classList.remove("dragged");
            }
          })(i)
        }
      }

      /* Drop target event handlers */
      function dragEnter(event) {
        droptarget.classList.remove("free");
        droptarget.classList.add("enter");
      }

      function dragOver(event) {

          event.preventDefault();
          return false; //Necessary to avoid default browsers behaviours
      }

      function dragLeave(event) {
        droptarget.classList.remove("enter");
        droptarget.classList.add("free");
      }

      function drop(event) {
          var data = event.dataTransfer.getData('text'); //reads the data set in dragStart()
          var answer = "petit test"; //TODO Utiliser $.get(url) etc ...


          //var url = "/api/ans/" + questionNumber + "/" + answerNumber;

          /*$.get(url)
            .done(function(data) {
              $domain.html(data.domain);
            })*/


          var choice = 0;

          droptarget.classList.remove("enter");

          for(var i = 1; i < draggable.length; i++){
            (function(i){
              if(document.getElementsByTagName('label')[i].getAttribute('for') == data){
                answerNumber = i;
                choice = draggable[i];
                choice.classList.add("hidden");
                event.target.innerHTML = data;
              }
            })(i)
          }

          if(choice.getElementsByTagName('label')[0].getAttribute('for') == answer){
            droptarget.classList.add("right");
            //event.target.style.border = "5px solid green"; //We indicate that the choosen answer is the good one
          }else{
            droptarget.classList.add("false");
            //event.target.style.border = "5px solid red"; //We indicate that the the choosen answer is not the good one
          }


          //When an element is dropped, we need to remove draggable class and attribute on other items in order to avoid multiple d&d
          for(var j = 1; j < draggable.length; j++ ){
            if(draggable[j] != undefined){
              (function(j){
                draggable[j].removeEventListener("dragstart", dragStart);
                draggable[j].removeEventListener("dragend", dragEnd);
                draggable[j].setAttribute("draggable", "false");
                draggable[j].classList.remove("draggable");
              })(j)
            }
          }

          droptarget.removeEventListener("dragenter", dragEnter);
          droptarget.removeEventListener("dragover", dragOver);
          droptarget.removeEventListener("dragleave", dragLeave);
          droptarget.removeEventListener("drop", drop);

          event.preventDefault();
          return false; //Necessary to avoid default browsers behaviours
      }
    }


    // ------------------------------------------------------------- DOM binding
    $(document).ready(changeQuestion);
    $nextQuestion.click(changeQuestion);
})();
