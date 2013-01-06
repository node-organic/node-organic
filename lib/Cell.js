require("colors");

var cluster = require('cluster');
var util = require("util");

var Membrane = require("./Membrane");
var Nucleus = require("./Nucleus");
var Plasma = require("./Plasma");

module.exports = function Cell(dna){

  if(!this.plasma)
    this.plasma = new Plasma();
  
  var nucleus = new Nucleus(dna, this.plasma);
  
  this.membrane = new Membrane(nucleus, this.plasma);
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