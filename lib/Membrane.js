module.exports = function Membrane(nucleus, plasma){
  this.nucleus = nucleus;
  this.plasma = plasma;
  var self = this;
  this.nucleus.createOrganellesFromDir("membrane", this, function(organelles){
    self.holes = organelles;
  });
}

module.exports.prototype.hole = function(name) {
  for(var i = 0; i<this.holes.length; i++)
    if(this.holes[i].name == name)
      return this.holes[i];
}