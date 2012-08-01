module.exports = function Organel(plasma){
  this.plasma = plasma;
}

module.exports.prototype.emit = function(chemical){
  this.plasma.emit(chemical, this);
}

module.exports.prototype.on = function(checmicalPattern, handler){
  this.plasma.on(checmicalPattern, handler, this);
}