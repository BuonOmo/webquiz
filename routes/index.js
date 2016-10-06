var express = require('express');
var router = express.Router();

const pagePath = 'pages/';
const pages = [
  { // --------------------------------------------------------------- home page
    path: pagePath + 'home',
    url: '/',
    opt: {
      id: "home"
    }
  },
  { // --------------------------------------------------------------- dashboard
    path: pagePath + 'dashboard',
    url: '/dashboard',
    opt: {
      id: "dashboard"
    }
  },
  { // ------------------------------------------------------- quick test page 1
    path: pagePath + 'test',
    url: '/test/1',
    opt: {
      id: "quick-test-page-1",
      firstHeader: 'Test rapide',
      next: '/test/2',
      questionNumber: '1',
      domain: 'HTML5',
      question:   "Comment vérifiez l'intégrité d'un script inséré à l'aide de la valise <script src=\"..\"> ?",
      answers: [
          "Utiliser un attribut integrity",
          "Lire le script et vérifier que c'est correct",
          "Appeler un ami !"
      ]
    }
  },
  { // ------------------------------------------------------- quick test page 2
    path: pagePath + 'test',
    url: '/test/2',
    opt: {
      id: "quick-test-page-2",
      firstHeader: 'Test rapide',
      next: '/dashboard',
      questionNumber: '2',
      domain: 'CSS3',
      question: "Est-il possible d'utiliser des variables globales en CSS3 ?",
      answers: [
          "Oui",
          "Peut-être",
          "Non",
          "Tabarnak, le web s'est fait pas pour moi !"
      ]
    }
  },
  { // ------------------------------------------------------------- exam page 1
    path: pagePath + 'test',
    url: '/exam/1',
    opt: {
      id: "exam-page-1",
      firstHeader: 'Examen',
      next: '/exam/2',
      questionNumber: '1',
      domain: 'HTML5',
      question:   "Question 1/2: Comment vérifiez l'intégrité d'un script inséré à l'aide de la valise <script src=\"..\"> ?",
      answers: [
          "Use integrity attribute",
          "Read the script and check if it’s good",
          "Call a friend"
      ]
    }
  },
  { // ------------------------------------------------------------- exam page 2
    path: pagePath + 'test',
    url: '/exam/2',
    opt: {
      id: "exam-page-2",
      firstHeader: 'Examen',
      next: '/result',
      questionNumber: '2',
      domain: 'CSS3',
      question: "Question 2/2: Est-il possible d'utiliser des variables globales en CSS3 ?",
      answers: [
          "Oui",
          "Peut-être",
          "Non",
          "Tabarnak, le web c'est pas fait pour moi !"
      ]
    }
  },
  { // ------------------------------------------------------------------ result
    path: pagePath + 'result',
    url: '/result',
    opt: {
      id: "result"
    }
  },
  { // ------------------------------------------------------------ instructions
    path: pagePath + 'instructions',
    url: '/instructions',
    opt: {
      id: "instructions"
    }
  }];

for (var page of pages) {
  (function (page) {
    var currentPage = page;
    // console.log(currentPage);
    router.get(page.url, function(req, res, next) {
      res.render(page.path,page.opt);
    });

  })(page);
}

module.exports = router;
