var util = require("util");

module.exports = function Organel(plasma, config){
  this.plasma = plasma;
  this.config = config;
}

module.exports.prototype.emit = function(chemical){
  this.plasma.emit(chemical, this);
}

module.exports.prototype.on = function(checmicalPattern, handler){
  this.plasma.on(checmicalPattern, handler, this);
}

module.exports.prototype.once = function(checmicalPattern, handler){
  this.plasma.once(checmicalPattern, handler, this);
}

module.exports.prototype.off = function(checmicalPattern, handler){
  this.plasma.off(checmicalPattern, handler, this);
}

module.exports.extend = function(constructor){
  util.inherits(constructor, module.exports);
  return constructor;
}