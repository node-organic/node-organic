var fs = require("fs");
var files = fs.readdirSync(__dirname+"/lib");
for(var i = 0; i<files.length; i++)
  module.exports[files[i].replace(".js", "")] = require("./lib/"+files[i]);