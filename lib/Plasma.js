var dict = require("dict");

module.exports = function Plasma(){
  this._listeners = dict({});
}

module.exports.prototype.getChemicalType = function (chemical) { //:String
  return chemical.type || chemical.constructor.toString();
}

module.exports.prototype.chemicalPatternToString = function (chemicalPattern) { //:String
  if (typeof chemicalPattern === 'string')
    return chemicalPattern;
  if (typeof chemicalPattern === 'function')
    return chemicalPattern.toString();
  
  throw "String or Function expected: " + typeof chemicalPattern + " toString: " + chemicalPattern;
}

module.exports.prototype.emit = function(chemical, sender, callback){

  if(typeof sender == "function") {
    callback = sender;
    sender = undefined;
  }
  
  var type = this.getChemicalType(chemical);
  var ls = this._listeners.get(type);
  for(var i = 0; i < ls.length; i++) {
    var listener = ls[i];
    
    // prevent emitting to self
    if(sender && sender == listener.context)
      continue;

    // self remove from listeners if "once" has been invoked
    if(listener.once) {
      ls.splice(i, 1);
      i -= 1;
    }
  
    var chemicalRecieved;
    if(listener.handle.length == 3)
      listener.handle.call(listener.context, chemical, sender, callback);
    else
      listener.handle.call(listener.context, chemical, callback);

    // in case plasma organelles received the chemical, further iterations are not allowed.
    if(chemicalRecieved !== false)
      return;
  }
}

var _addListener = function (plasma, lsnr) {
  var cp = lsnr.chemicalPattern;
  var ls = plasma._listeners;
  if (! ls.has(cp))
    ls.set(cp, []);
  ls.get(cp).push(lsnr);
}

module.exports.prototype.once = function(chemicalPattern, handler, context) {
  var cp = this.chemicalPatternToString(chemicalPattern);
  _addListener(this, {chemicalPattern: cp, handle: handler, context: context, once: true});
}

module.exports.prototype.on = function(chemicalPattern, handler, context){
  var cp = this.chemicalPatternToString(chemicalPattern);
  _addListener(this, {chemicalPattern: cp, handle: handler, context: context});
}

module.exports.prototype.off = function(chemicalPattern, handler){
  var cp = this.chemicalPatternToString(chemicalPattern);
  var ls = this._listeners.get(cp);
  for(var i = 0 ;i<ls.length; i++) {
    var listener = ls[i];
    if(listener.chemicalPattern == cp && listener.handle == handler)
      ls.splice(i, 1);
  }  
}