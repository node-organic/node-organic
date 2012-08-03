module.exports = function Nucleus(dna, plasma){
  this.dna = dna;
  this.plasma = plasma;
}

module.exports.prototype.createFrom = function(type, options){
  var result = [];
  if(this.dna[type]) {
    var value = this.dna[type]
    for(var i = 0; i<value.length; i++) {
      var path = value[i];
      var config;
      if(typeof path == "object") {
        config = path;
        path = config.path;
      }
      var Class = require(process.cwd()+path);
      var instance = new Class(options || this.plasma, config);
      result.push(instance);
    }
  }
  return result;
}