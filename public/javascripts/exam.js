(function () {
  'use strict';
  // --------------------------------------------------- variable initialisation
  /*
   * HACK: we are passing a parameter to this scripts through a script tag in
   *       test.pug. pageId is a global variable.
   */
  var isExam = 'exam' == pageId;

  var questionId,
      score    = 0,
      counter  = 0,
      answered = true;

  if (isExam)
      var numberOfQuestions = 10,
          domains  = ""; // used in changeQuestion, to see if used has answered

  // JQuery quick access to important nodes
  var $domain       = $('#domain'),
      $question     = $('#question'),
      $answers      = $('#answers'),
      $nextQuestion = $('#next-question'),
      $dashboard    = $('#dashboard'),
      $score        = $('#score'),
      $droptarget   = $('#droptarget');

  if (isExam) $.get('/api/user',(data) => initExam(data.currentExam));
  else main();

  function initExam(exam) {

    if (!exam) {
      $.get('/api/user',function(data){
        numberOfQuestions = data.numberOfQuestions;
        domains           = data.domains;
        // clearEnhancement();
      });
      main();
      return;
    }

    questionId = exam.questionId;
    score      = exam.score;
    counter    = exam.counter;
    domains    = exam.domains;
    numberOfQuestions = exam.numberOfQuestions;
    main();
  }

  function main() {
    function saveEnhancement() {
      $.ajax({
        method: 'PATCH',
        url: '/api/user',
        data: JSON.stringify({
          currentExam: {
            score: score,
            counter: counter,
            questionId: questionId,
            numberOfQuestions: numberOfQuestions,
            domains: domains
          }
        })
      });
    }
    function clearEnhancement() {
      $.ajax({
        method: 'PATCH',
        url: '/api/user',
        data: {
          currentExam: null
        }
      });
    }
    function validateAnswer(good) {
      if (good) ++score;
      answered = true;
      questionId = null;
      saveEnhancement();
      updateQuestionStats(good);
      $score.html(score + " / " + counter);
    }

    changeQuestion();

    // ---------------------------------------------------- main logic (functions)
    /**
     * Change DOM elements relative to a question :
     *  - question
     *  - domain
     *  - answers
     *  - score count (through dragndrop function)
     *
     * The question is randomly retrieved from the database. If the global
     * parameter isExam is set, then the question can be only in domains
     * contained in sessionStorage.domains; and it also increment the counter.
     * If the counter is greater than sessionStorage.numberOfQuestions, then exam
     * is over and window is redirected to /result.
     * @return undefined
     */
    function changeQuestion() {
      if (!answered) {
        $droptarget.addClass('blink');
        return;
      }
      answered = false;
      var url;
      if (isExam) {
        if (counter === numberOfQuestions - 1)
          $nextQuestion.find('span').html('Fin de l’examen');
        else if (counter === numberOfQuestions) {
          $.post('/api/results',{
              domains: domains,
              timestamp: Date.now(),
              goodAnswers: score,
              totalAnswers: numberOfQuestions,
              surrender: false
          });
          go('result');
          return;
        } else if (counter > numberOfQuestions)
          console.error("An error occured..");
          console.log(questionId, domains)
        if (questionId) url = "/api/question/short/"+questionId;
        else if (domains && domains.length)
          url = "/api/question/short/domains/" + domains;
        else url = "/api/question/short"
      } else {
        url = "/api/question/short/";
      }
      $.get(url)
        .done(function(data) {
          ++counter;
          questionId = data._id;
          // save enhancement again because we updated questionId and counter
          saveEnhancement();
          $domain.html(data.domain);
          $question.html(data.question);
          // clean everything except first answer (bones)
          $answers.find('.answer:not(:first)').remove()
          for (var answer of data.answers) {
            $answers.find('.answer:first').clone()
                    .find('label').html(answer).end()
                    .appendTo($answers).show();
          }
          dragndrop();
        }).fail(console.error);

    }

    function dragndrop(){
      var draggable = document.querySelectorAll(".answer");
      var droptarget = document.getElementById("droptarget");

      droptarget.innerHTML = "Glisser la réponse !";
      droptarget.classList.remove("false");
      droptarget.classList.remove("right");
      droptarget.classList.add("free");

      for(var i = 1; i < draggable.length; i++){
        (function(i){
          draggable[i].classList.add("draggable");
          draggable[i].setAttribute("draggable", "true");
          draggable[i].addEventListener('dragstart', dragStart, false);  //the user starts dragging the element
          draggable[i].addEventListener('dragend'  , dragEnd  , false);
        })(i)
      }

      // Fired when the user drags the draggable onto the drop target (only fires
      // when the draggable element changes from being outside to being over)
      droptarget.addEventListener('dragenter', dragEnter, false);
      // Fired once the draggable element is over the drop target and keeps
      // firing for as long as the draggable element is being dragged over the
      // drop target.
      droptarget.addEventListener('dragover' , dragOver , false);
      // If the user drags the draggable object out of the drop target again,
      // the dragleave event is fired.
      droptarget.addEventListener('dragleave', dragLeave, false);
      // If the user drops the draggable object on the drop target, the drop
      // event is fired.
      droptarget.addEventListener('drop'     , drop     , false);

      /* Draggable event handlers */
      function dragStart(event) {
          var dataToSet = event.target.getElementsByTagName('label')[0].innerHTML;
          event.dataTransfer.setData("text", dataToSet); //data that is transfered to the drop target when the element is dropped. (MIME, data)
          event.dataTransfer.effectsAllowed = "copy";

          for(var i = 1; i < draggable.length; i++){
            (function(i){
              if(document.getElementsByTagName('label')[i].innerHTML == event.target.getElementsByTagName('label')[0].innerHTML){
                draggable[i].classList.add("dragged");
              }
            })(i)
          }
      }

      function dragEnd(event) {
        for(var i = 1; i < draggable.length; i++){
          (function(i){
            if(document.getElementsByTagName('label')[i].innerHTML == event.target.getElementsByTagName('label')[0].innerHTML){
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
          var url = "/api/ans/" + questionId + "/";
          var isGoodAnswer = 0;
          var indexAnswer = 0;
          var choice = 0;

          droptarget.classList.remove("enter");

          for(var i = 1; i < draggable.length; i++){
            (function(i){
              if(document.getElementsByTagName('label')[i].innerHTML == data){
                url += i-1;
                choice = draggable[i];
                choice.classList.add("hidden");
                event.target.innerHTML = data;
              }
            })(i)
          }

          $.get(url)
            .done(function(data) {
              isGoodAnswer = data.isGoodAnswer;
              indexAnswer = data.goodAnswerIndex;
              if(isGoodAnswer){
                droptarget.classList.add("right");
                //We indicate that the choosen answer is the good one
              }else{
                droptarget.classList.add("false");
                draggable[indexAnswer+1].classList.add("right");
                //We indicate that the the choosen answer is not the good one and we show the good one
              }
              validateAnswer(isGoodAnswer);


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

            });

            event.preventDefault();
            event.stopPropagation();
      }
    }


    /**
     * Update statistics for a question only.
     *
     * @return undefined
     */
    function updateQuestionStats(isGood, isExam) {
      var toSend = ["answers"];
      if (isExam) {
        toSend.push("examAnswers");
        if (isGood) toSend.push("goodExamAnswers");
      }
      if (isGood) toSend.push("goodAnswers");
      $.ajax({
        method: 'PATCH',
        url: '/api/statistics/increment',
        data: JSON.stringify(toSend)
      }).fail(console.error);
    }

    // ------------------------------------------------------------- DOM binding
    $nextQuestion.click(changeQuestion);
    $droptarget.on('animationend', function(event) {
      $(this).removeClass('blink');
    });

    if (isExam) {
      $('#dashboard').click(function(event) {
        event.preventDefault();
        $.post('/api/result',{
          domains: domains,
          timestamp: Date.now(),
          goodAnswers: 0,
          totalAnswers: counter - 1,
          surrender: true
        }).fail(console.error);
        $(window).unbind('beforeunload');
        go('result');
      });
    }
  }
})();
