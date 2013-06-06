require('shelljs/global');

var p = require("../package.json");
var newVersion = p.version.split(".");
newVersion[2] = (parseInt(newVersion[2])+1).toString();
newVersion = newVersion.join(".");
cd(__dirname+"/../");

if(exec("git pull upstream master").code != 0){
  echo("Error: failed to git pull upstream");
  exit(1);
}

// TODO find out how to trap errors from sed bellow
sed('-i', '"version": "'+p.version+'"', '"version": "'+newVersion+'"', "package.json");

if(exec("git add --all").code != 0){
  echo("Error: failed to git add --all");
  exit(1);
}

if(exec("git commit -am '"+newVersion+" release'").code != 0){
  echo("Error: failed to commit version bump");
  exit(1);
}

if(exec("git push").code != 0){
  echo("Error: failed to git push");
  exit(1);
}

if(exec("npm publish").code != 0){
  echo("Error: failed to npm publish");
  exit(1);
}

if(exec("git push upstream master").code != 0){
  echo("Error: failed to git push upstream");
  exit(1);
}