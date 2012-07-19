module.exports = function Plasma(){
  this._listeners = [];
}

module.exports.prototype.emit = function(chemical){
  for(var i = 0; i<this._listeners.length; i++) {
    var listener = this._listeners[i];

    if(chemical.type && listener.chemicalPattern === chemical.type) {
      if(listener.handle(chemical)) return;
    } /*else
    if(listener.chemicalPattern.match && listener.chemicalPattern.match(chemical)) {
      if(listener.handle(chemical)) return;
    } else
    if(listener.chemicalPattern === chemical) {
      if(listener.handle(chemical)) return;
    }*/
  }
}

module.exports.prototype.on = function(chemicalPattern, handler){
  this._listeners.push({chemicalPattern: chemicalPattern, handle: handler});
}

module.exports.prototype.off = function(chemicalPattern, handler){
  for(var i = 0 ;i<this._listeners.length; i++) {
    var listener = this._listeners[i];
    if(listener.chemicalPattern == chemicalPattern && listener.handle == handler)
      this._listeners.splice(i, 1);
  }
}