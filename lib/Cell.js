var xtend = require("xtend");

//default core organelles
var dcore = {};
dcore.Plasma = require("./Plasma");
dcore.Nucleus = require("./Nucleus");

module.exports = function Cell(dna, core){
  core = xtend({}, dcore, core || {});

  if(!this.plasma)
    this.plasma = new core.Plasma();

  var nucleus = new core.Nucleus(dna, this.plasma);
  this.plasma.on("build", function(c,callback){
    nucleus.build(c,callback)
  })
}

module.exports.prototype.emit = function(c, callback) {
  this.plasma.emit(c, callback);
}

module.exports.prototype.on = function(pattern, callback) {
  this.plasma.on(pattern, callback);
}