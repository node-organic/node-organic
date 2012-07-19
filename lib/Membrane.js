module.exports = function Membrane(nucleus, plasma){
  this.nucleus = nucleus;
  this.holes = nucleus.create("holes");
  this.plasma = plasma;
}