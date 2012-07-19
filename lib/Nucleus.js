module.exports = function Nucleus(dna, plasma){
  this.dna = dna;
  this.plasma = plasma;
}

module.exports.prototype.create = function(type){
  var result = [];
  if(this.dna[type]) {
    var value = this.dna[type]
    for(var i = 0; i<value.length; i++) {
      var path = value[i];
      var Class = require(process.cwd()+path);
      result.push(new Class(this.plasma));
    }
  }
  return result;
}