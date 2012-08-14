var util = require("util");
var Organel = require("organic").Organel;

module.exports = function ErrorHandler(plasma){
  Organel.call(this, plasma);

  this.on("answer", function(chemical){
    chemical.type = "print";
    chemical.data = chemical.data.rainbow;
    return false;
  });
}

util.inherits(module.exports, Organel);