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
    }
  },
  {
    path: 'pages/dashboard.pug',
    render: {
      path: 'html/dashboard/index.html'
    }
  }
  // configs for each pages here
]

function writeFile(path, contents, callback) {
  mkdirp(dir(path), function (err) {
    if (err) return callback(err);

    fs.writeFile(path, contents, callback);
  });
}

for (page of configs) {
  //--------------------------------------------------------------------- Render
  var render = pug.renderFile(page.path,{
    pretty: true
  });

  //----------------------------------------------------------------- Write file
  /*
  Help from http://stackoverflow.com/questions/2496710/writing-files-in-node-js
  */
  writeFile(page.render.path, render, function(err) {
    if(err) { return console.error(err); }
  });
}
