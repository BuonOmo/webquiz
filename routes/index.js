var express = require('express');
var getDomains = require('../controllers/question').getAllDomains;
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
  { // -------------------------------------------------------------- quick test
    path: pagePath + 'test',
    url: '/test',
    opt: {
      id: "quick-test",
      firstHeader: 'Test rapide'
    }
  },
  { // -------------------------------------------------------------------- exam
    path: pagePath + 'test',
    url: '/exam',
    opt: {
      id: "exam",
      firstHeader: 'Examen'
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
  },
  { // ------------------------------------------------------------- old browser
    path: pagePath + 'old-browser',
    url: '/ie',
    opt: {}
  },
  { // ---------------------------------------------------------------- question
    path: pagePath + 'question',
    url: '/ajoutQuestion',
    opt: {}
  }];

function examRedirection(req, res, next) {
  if (req.url === '/exam') next();
  else require('../controllers/user').inExam(
      () => res.redirect('/exam'),
      () => next());
}

function loadAllPages() {
  for (var page of pages) {
    (function (page) {
      router.get(page.url, examRedirection, (req, res, next) => {
        res.render(page.path,page.opt);
      });

    })(page);
  }
}
getDomains((domains) => {
  pages[1].opt.domains = domains;
  loadAllPages();
});

module.exports = router;
