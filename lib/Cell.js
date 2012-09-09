require("colors");

var cluster = require('cluster');

var Membrane = require("./Membrane");
var Nucleus = require("./Nucleus");
var Plasma = require("./Plasma");

module.exports = function Cell(dna){

  this.plasma = new Plasma();

  var nucleus = new Nucleus(dna, this.plasma);
  
  this.membrane = new Membrane(nucleus, this.plasma);
  this.organelles = nucleus.createNamespace("plasma", this);
}

module.exports.prototype.clone = function(){
  // experimental
  return cluster.fork();
}