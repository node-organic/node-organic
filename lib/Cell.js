require("colors");

var cluster = require('cluster');

var Membrane = require("./Membrane");
var Nucleus = require("./Nucleus");
var Plasma = require("./Plasma");

module.exports = function Cell(dna){
  this.plasma = new Plasma();
  this.nucleus = new Nucleus(dna, this.plasma);
  if(dna.nucleus)
    this.nucleusOrganelles = this.nucleus.createOrganellesFrom("nucleus", this.nucleus);
  this.membrane = new Membrane(this.nucleus, this.plasma);
  this.organelles = this.nucleus.createOrganellesFrom("plasma");
}

module.exports.prototype.clone = function(){
  // experimental
  return cluster.fork();
}