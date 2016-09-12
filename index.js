/*
Configuration below use code from https://pugjs.org/api/getting-started.html
*/

const fs = require('fs'),
     pug = require('pug');


const configs = [
  {
    path: "pages/home.pug",
    render: {
      path: "html/index.html"
    }
  },
  // configs for each pages here
]

for (page of configs) {
  //--------------------------------------------------------------------- Render
  var render = pug.renderFile(page.path,{
    pretty: true
  });

  //----------------------------------------------------------------- Write file
  /*
  Helped from http://stackoverflow.com/questions/2496710/writing-files-in-node-js
  */
  fs.writeFile(page.render.path, render, function(err) {
    if(err) { return console.error(err); }
    console.log("The file "+page.render.path+" was saved!");
  });
}
