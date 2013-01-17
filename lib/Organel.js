var util = require("util");

module.exports = function Organel(plasma, config, parent){
  this.plasma = plasma;
  this.config = config;
  this.parent = parent;
}

module.exports.prototype.emit = function(chemical, callback){
  this.plasma.emit(chemical, this, callback);
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

module.exports.extend = function(constructor, properties){
  util.inherits(constructor, module.exports);
  for(var key in properties) 
    constructor.prototype[key] = properties[key];
  return constructor;
}