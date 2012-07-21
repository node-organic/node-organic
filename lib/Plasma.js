module.exports = function Plasma(){
  this._listeners = [];
}

module.exports.prototype.emit = function(chemical){
  var returnValue = false;
  for(var i = 0; i<this._listeners.length; i++) {
    var listener = this._listeners[i];

    if(chemical.type && listener.chemicalPattern === chemical.type) {
      var chemicalReceived = listener.handle(chemical);
      if(typeof chemicalReceived != "undefined")
        return chemicalReceived;
      returnValue = true;
    }
  }
  return returnValue;
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