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
    }
  },
  { // ------------------------------------------------------- quick test page 2
    path: pagePath + 'test',
    url: '/test/2',
    opt: {
      id: "quick-test-page-2",
      firstHeader: 'Test rapide',
      next: '/dashboard',
    }
  },
  { // ------------------------------------------------------------- exam page 1
    path: pagePath + 'test',
    url: '/exam/1',
    opt: {
      id: "exam-page-1",
      firstHeader: 'Examen',
      next: '/exam/2',
    }
  },
  { // ------------------------------------------------------------- exam page 2
    path: pagePath + 'test',
    url: '/exam/2',
    opt: {
      id: "exam-page-2",
      firstHeader: 'Examen',
      next: '/result',
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
