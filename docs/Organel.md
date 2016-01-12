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


## Best practices

* attach organelle's reaction functions to its prototype, this way inheriting of organelles and overriding reactions can be achieved.
* store references to plasma and dna so that reaction functions can use them accordingly when needed.
* dispose resources acquired during the lifetime of the Organelle
* unregister any previously registered reactions during dispose process
* do not hard code chemical patterns and their relation to reactions. Instead use the information provided by the dna structure to build the mappings.
