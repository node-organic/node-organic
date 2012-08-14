var util = require("util");
var Organel = require("organic").Organel;

module.exports = function ErrorHandler(plasma){
  Organel.call(this, plasma);

  this.on("print", function(chemical){
    console.log("Thank you for your feedback:", chemical.data);
  });
}

util.inherits(module.exports, Organel);