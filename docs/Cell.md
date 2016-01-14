# Cell

## Cell abstract

    var Cell = function Cell(){
      this.plasma = new Plasma()
    }

    module.exports.prototype.build = function(dna){
      var nucleus = new Nucleus(this.plasma, dna)
      this.plasma.on("build", nucleus.build, nucleus)
      this.plasma.emit({type: "build", branch: "organelles"})
    }

    module.exports.prototype.kill = function(){
      this.plasma.emit({type: "kill"})
    }

## Best practices

* Do not store reference of DNA object within the cell because access to DNA should be provided only to trusted instances like Nucleus based implementations.
* Provide `build` and `kill` methods with their respective implementations so that a cell instance can be managed and tested.
