require("colors");

var cluster = require('cluster');
var util = require("util");
var xtend = require("xtend");

//default core organelles
var dcore = {};
dcore.Membrane = require("./Membrane");
dcore.Nucleus = require("./Nucleus");
dcore.Plasma = require("./Plasma");

module.exports = function Cell(dna, core){
  core = xtend({}, dcore, core || {});

  if(!this.plasma)
    this.plasma = new core.Plasma();
  
  var nucleus = new core.Nucleus(dna, this.plasma);
  
  this.membrane = new core.Membrane(nucleus, this.plasma);
  this.organelles = nucleus.createNamespace("plasma", this);
}

module.exports.prototype.clone = function(){
  // experimental
  return cluster.fork();
}

module.exports.extend = function(constructor, properties){
  util.inherits(constructor, module.exports);
  for(var key in properties) 
    constructor.prototype[key] = properties[key];
  return constructor;
}