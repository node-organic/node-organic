module.exports = function Membrane(nucleus, plasma){
  this.nucleus = nucleus;
  this.plasma = plasma;
  this.holes = this.nucleus.createNamespace("membrane", this);
}

module.exports.prototype.hole = function(name) {
  for(var i = 0; i<this.holes.length; i++)
    if(this.holes[i].name == name)
      return this.holes[i];
}