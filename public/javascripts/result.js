(function(){
  'use strict';

  var results = getLocal("results");
  var result = results[results.length - 1]; //On récupère le dernier
  var pourcentage = Math.floor(100 * result.goodAnswers / result.totalAnswers);
  var affichage = "Vous avez : " + result.goodAnswers + "/" + result.totalAnswers + " bonnes réponses !<br /> Le pourcentage de réussite est donc de : " + pourcentage + "%. <br /><br />";

  if(pourcentage >= 0 && pourcentage <= 25){
    affichage += "Ce n'est pas bon du tout ! Il va falloir plus réviser...";
  }else if(pourcentage > 25 && pourcentage <= 50){
    affichage += "Un proverbe russe dit : \" en dessous de la moyenne.. direction le goulag !\" Reprenez-vous..";
  }else if(pourcentage > 50 && pourcentage <= 75){
    affichage += "Vous avez plus de la moyenne ! C'est correct mais perfectible ! ";
  }else{
    affichage += "Quelle performance ! Même Ulysse n'arrive pas à atteindre ce score !'";
  }

  $('p').html(affichage);

})();
