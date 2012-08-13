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