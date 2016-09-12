/*
Configuration below use code from https://pugjs.org/api/getting-started.html
*/

const fs = require('fs'),
  mkdirp = require('mkdirp'),
     dir = require('path').dirname,
     pug = require('pug');


const configs = [
  {
    path: 'pages/home.pug',
    render: {
      path: 'html/index.html'
    },
    variables: {}
  },
  {
    path: 'pages/dashboard.pug',
    render: {
      path: 'html/dashboard/index.html'
    },
    variables: {}
  },
  { // quick test page 1
    path: 'pages/test.pug',
    render: {
      path: 'html/test/1/index.html'
    },
    variables: {
      next: '/test/2/',
      questionNumber: '1',
      domain: 'HTML5'
    }
  },
  { // quick test page 2
    path: 'pages/test.pug',
    render: {
      path: 'html/test/2/index.html'
    },
    variables: {
      next: '/dashboard/',
      questionNumber: '2',
      domain: 'CSS3'
    }
  }
  // configs for each pages here
]

/*
Help from http://stackoverflow.com/questions/16316330/how-to-write-file-if-parent-folder-doesnt-exist#16317628
*/
function writeFile(path, contents, callback) {
  mkdirp(dir(path), function (err) {
    if (err) return callback(err);

    fs.writeFile(path, contents, callback);
  });
}

for (page of configs) {
  //--------------------------------------------------------------------- Render
  var opt = Object.assign(page.variables, { pretty: true });
  var render = pug.renderFile(page.path,opt);

  //----------------------------------------------------------------- Write file
  /*
  Help from http://stackoverflow.com/questions/2496710/writing-files-in-node-js
  */
  writeFile(page.render.path, render, function(err) {
    if(err) { return console.error(err); }
  });
}
