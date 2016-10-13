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
  }];

for (var page of pages) {
  (function (page) {
    var currentPage = page;
    router.get(page.url, function(req, res, next) {
      res.render(page.path,page.opt);
    });

  })(page);
}

module.exports = router;
