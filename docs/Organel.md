# usage #

    module.exports = function(plasma, dna) {
      var self = this
      plasma.on("chemicalType", function(c){
        self.reactionA(c)
      })
    }

    module.exports.prototype.reactionA = function(c, next){}

# usage 2 #

    var Organel = require("organic").Organel
    module.exports = Organel.extend(function(plasma, dna){
      // constructor
      Organel.call(plasma, dna)
    }, {
      reactionA: function(){
        // class/prototype method
      }
    })
