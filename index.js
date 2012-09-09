var fs = require("fs");
var files = fs.readdirSync(__dirname+"/lib");
for(var i = 0; i<files.length; i++)
  if (files[i].indexOf(".js") !== -1)
    module.exports[files[i].replace(".js", "")] = require("./lib/"+files[i]);