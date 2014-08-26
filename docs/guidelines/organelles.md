# Organelles guidelines

    var util = require("util")
    var Organel = require("organic").Organel

    module.exports = function MyOrganelle(plasma, dna) {
      this.plasma = plasma
      this.dna = dna

      this.plasma.on(dna.asyncOn, this.asyncReaction)
      this.plasma.on(dna.syncOn, this.syncReaction)

      this.plasma.on(dna.killOn, this.dispose)
    }

    util.inherits(module.exports, Organel)

    module.exports.prototype.asyncReaction = function(chemical, callback) {
      // asyncReaction implementation calling callback once finished/needed
    }

    module.exports.prototype.syncReaction = function(chemical) {
      // syncReaction implementation, note that callback argument is missing
    }

    module.exports.prototype.dispose = function(chemical, callback) {
      this.plasma.off(this.dna.asyncOn, this.asyncReaction)
      this.plasma.off(this.dna.syncOn, this.syncReaction)

      // ... dispose any resources acquired during lifetime of the Organelle
    }

----

* attach organelle's reaction functions to its prototype, this way inheriting of organelles and overriding reactions can be achieved.
  * store references to plasma and dna so that reaction functions can use them accordingly when needed.
* dispose resources acquired during the lifetime of the Organelle
  * unregister any previously registered reactions during dispose process
* do not hard code chemical patterns and their relation to reactions. Instead use the information provided by the dna structure to build the mappings.