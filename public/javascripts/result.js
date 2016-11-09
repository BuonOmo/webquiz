(function(){
  'use strict';
  function provideText(result) {
    var pourcentage = Math.floor(100 * result.goodAnswers / (result.totalAnswers || 1));
    var affichage = "Vous avez : " + result.goodAnswers + "/" + result.totalAnswers + " bonnes réponses.<br />" +
                     "Le pourcentage de réussite est donc de : " + pourcentage + "%. <br /><br />";
    var validiteRessource = 30000; //La ressource est valide pendant 30s
    if(Date.now() < Date.parse(result.timestamp) + validiteRessource){
      if(result.surrender || pourcentage >= 0 && pourcentage <= 25){
        affichage += "Ce n'est pas bon du tout ! Il va falloir plus réviser...";
      }
      else if(pourcentage > 25 && pourcentage <= 50){
        affichage += "Un proverbe russe dit : \" en dessous de la moyenne.. direction le goulag !\" Reprenez-vous..";
      }
      else if(pourcentage > 50 && pourcentage <= 75){
        affichage += "Vous avez plus de la moyenne ! C'est correct mais perfectible ! ";
      }
      else{
        affichage += "Quelle performance ! Même Ulysse n'arrive pas à atteindre ce score !";
      }
      $('.result').html(affichage);
    }
    else{
      affichage = "La ressource demandée n'est plus disponible.";
      $('main>h1').html(affichage);
    }
  }
  $.get('/api/result/last',provideText)
})();
