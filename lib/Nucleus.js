var fs = require("fs");
var path = require("path");

module.exports = function Nucleus(dna, plasma){
  this.dna = dna;
  this.plasma = plasma;
  this.organelles = [];

  var self = this;
  this.createOrganellesFromDir("nucleus", this, function(organelles){
    self.organelles.concat(organelles);
  });
}

module.exports.prototype.createOrganellesFromDir = function(name, options, callback) {
  var target = process.cwd()+"/"+name;
  var self = this;
  fs.readdir(target, function(err, files){
    if(err) {
      // target does not exists, or there aren't permissins... skip it
      if(callback)
        callback();
      return;
    }

    var result = [];
    for(var i = 0; i<files.length; i++) {
      if(files[i].indexOf(".js") !== -1) {
        var filename = path.basename(files[i], ".js");
        var OrganelClass = require(target + "/" + files[i]);
        var config = self.dna[name][filename] || options;
        var instance = new OrganelClass(self.plasma, config);
        self.organelles.push(instance);
        result.push(instance);
      }
    }

    if(callback)
      callback(result);
  });
}

module.exports.prototype.createOrganellesFrom = function(type, options){
  var result = [];
  if(this.dna[type]) {
    var value = this.dna[type]
    for(var i = 0; i<value.length; i++) {
      var path = value[i];
      var config;
      if(typeof path == "object") {
        config = path;
        path = config.path;
      }
      var OrganelClass = require(process.cwd()+path);
      var instance = new OrganelClass(this.plasma, options || config);
      result.push(instance);
      this.organelles.push(instance);
    }
  }
  return result;
}