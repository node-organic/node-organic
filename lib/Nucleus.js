module.exports = function Nucleus(dna, plasma){
  this.dna = dna;
  this.plasma = plasma;
  this.organelles = [];
}

module.exports.prototype.createOrganellesFrom = function(type, options){
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
      var OrganelClass = require(process.cwd()+path);
      var instance = new OrganelClass(this.plasma, options || config);
      result.push(instance);
      this.organelles.push(instance);
    }
  }
  return result;
}