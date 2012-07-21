var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function Page(plasma){
  Organel.call(this, plasma);

  plasma.on("renderPage", function(chemical){
    if(!chemical.page)
      return;
    chemical.data = {
      version: "0.0.0"
    }
  });
}

util.inherits(module.exports, Organel);