# Organelles guidelines

    var util = require("util")
    var Organel = require("organic").Organel

    module.exports = function MyOrganelle(plasma, dna) {
      this.plasma = plasma
      this.dna = dna

      this.plasma.on("chemical", this.asyncReaction)
      this.plasma.on("chemical2", this.syncReaction)
    }

    util.inherits(module.exports, Organel)

    module.exports.prototype.asyncReaction = function(chemical, callback) {
      // asyncReaction implementation calling callback once finished/needed
    }

    module.exports.prototype.syncReaction = function(chemical) {
      // syncReaction implementation, note that callback argument is missing
    }

----

* attach organelle's reaction functions to its prototype, this way inheriting of organelles and overriding reactions can be achieved.
  * store references to plasma and dna so that reaction functions can use them accordingly when needed.