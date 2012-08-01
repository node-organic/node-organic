require("colors");

var cluster = require('cluster');

var Membrane = require("./Membrane");
var Nucleus = require("./Nucleus");
var Plasma = require("./Plasma");

module.exports = function Cell(dna){
  this.plasma = new Plasma();
  this.nucleus = new Nucleus(dna, this.plasma);
  this.membrane = new Membrane(this.nucleus, this.plasma);
  this.organelles = this.nucleus.create("organelles");
}

module.exports.prototype.clone = function(){
  // experimental
  return cluster.fork();
}