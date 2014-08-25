# Cells guidelines

    var Cell = function Cell(){
      this.plasma = new Plasma()
    }

    module.exports.prototype.build = function(dna, done){
      var nucleus = new Nucleus(this.plasma, dna)
      this.plasma.on("build", nucleus.build, nucleus)
      this.plasma.emit({type: "build", branch: "organelles"}, done)
    }

    module.exports.prototype.kill = function(done){
      this.plasma.emitAndCollect({type: "kill"}, done)
    }

---- 
* Do not store reference of DNA object within the cell because access to DNA should be provided only to trusted instances like Nucleus based implementations.
* Always provide `build` and `kill` methods with their respective implementations so that a cell instance can be managed and tested.