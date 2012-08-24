var fs = require("fs");
var path = require("path");
var DNA = require("./DNA");
var vm = require('vm');

module.exports = function Nucleus(dna, plasma){
  this.dna = dna instanceof DNA?dna:new DNA(dna);
  this.plasma = plasma;
  this.organelles = this.createNamespace("nucleus");
}

module.exports.prototype.createNamespace = function(namespace, options){
  var result = [];
  var branch = this.dna.selectBranch(namespace);
  if(branch) {
    for(var objectId in branch) {
      var objectConfig = branch[objectId];
      var source = objectConfig.source.split(".").join("/");
      if(source.indexOf("/") !== 0)
        source = process.cwd()+"/"+source;
      var OrganelClass = require(source);
      var instance = new OrganelClass(this.plasma, options || objectConfig);
      result.push(instance);
      this.organelles.push(instance);
    }
  }
  return result;
}