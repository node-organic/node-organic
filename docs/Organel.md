# Organel

These are the building blocks of organic application, they in general are clonable components of reactions with given `self-state`. Organelles are simple class implementations having the following form:

    var Organelle = function(plasma, dna) {
      this.plasma = plasma
      plasma.on(dna.reactOn, this.reactionToChemical, this)
    }

    Organelle.prototype.reactionToChemical = function(c, next) {
      // -- reaction logic
      // -- submits new chemical in plasma via this.plasma.emit(...) 
      // -- calls next()
    }

## abstract Organel

### constructor function Organel(plasma, dna)

Should implement construction and building logic of Organelle.

* `plasma` is expected to implement [Plasma](./Plasma.md)
* `dna` is expected to implement [DNA](./DNA.md)

### function dispose(chemical, callback)

A [Reaciton](./Reactions.md#reactionfn) function. Should implement if required destruction and disposal logic of Organelle instance.

* `chemical` is expected to implement [Chemical](./Chemical.md)
* `callback` is expected to implement [reactionFn callback form](./Reactions.md#reactionfn-callback) form of `function(err, result)`