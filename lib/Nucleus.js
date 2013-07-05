var fs = require("fs");
var path = require("path");
var util = require("util");

var DNA = require("./DNA");

module.exports = function Nucleus(plasma, dna){
  this.plasma = plasma;
  this.dna = dna instanceof DNA?dna:new DNA(dna);
}

module.exports.prototype.buildOne = function(c, callback){
  if(typeof c.source == "function") {
    var instance = new c.source(this.plasma, c, this);
    if(callback) callback(instance);
    return instance
  }

  var objectConfig = c;
  if(!objectConfig.source)
    throw new Error("can not create object without source but with "+util.inspect(c));
  var source = objectConfig.source;
  if(source.indexOf(".") && source.indexOf("/") === -1 && source.indexOf("\\") === -1)
    source = source.split(".").join("/");
  if(source.indexOf("/") !== 0 && source.indexOf(":\\") !== 1)
    source = process.cwd()+"/"+source;
  var OrganelClass = require(source);
  var instance = new OrganelClass(this.plasma, objectConfig, this);
  if(callback) callback(instance);
  return instance;
}

module.exports.prototype.build = function(c, callback) {
  if(c.source) {
    return this.buildOne(c, callback)
  }
  if(c.branch)
    c = this.dna.selectBranch(c.branch)
  if(typeof c == "string")
    c = this.dna.selectBranch(c)

  var results = []
  for(var name in c)
    results.push(this.buildOne(c[name]))
  if(callback) callback(results)
  return results
}