var fs = require("fs");
var path = require("path");
var DNA = require("./DNA");
var util = require("util");

module.exports = function Nucleus(dna, plasma){
  this.dna = dna instanceof DNA?dna:new DNA(dna);
  this.organellesMap = {};
  this.plasma = plasma;
  this.organelles = this.createNamespace("nucleus", this);
}

module.exports.prototype.createNamespace = function(namespace, parent){
  var result = [];
  var branch = this.dna.selectBranch(namespace);
  if(branch) {
    for(var objectId in branch) {
      var objectConfig = branch[objectId];
      if(!objectConfig.source)
        throw new Error("can not create object without source at "+namespace+" "+util.inspect(objectConfig));
      var source = objectConfig.source;
      if(source.indexOf(".") && source.indexOf("/") === -1 && source.indexOf("\\") === -1)
        source = source.split(".").join("/");
      if(source.indexOf("/") !== 0 && source.indexOf(":\\") !== 1)
        source = process.cwd()+"/"+source;
      var OrganelClass = require(source);
      var instance = new OrganelClass(this.plasma, objectConfig, parent);
      result.push(instance);
      
      var address = (typeof objectConfig.address !== "undefined") ? objectConfig.address : (namespace + objectId);
      this.organellesMap[address] = { "instance": instance };
    }
  }
  return result;
}