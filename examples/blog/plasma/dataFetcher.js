var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function DataFetcher(plasma){
  Organel.call(this, plasma);

  this.on("fetchData", function(chemical){
    chemical.type = "renderPage";
    chemical.data = {
      version: "0.0.0"
    }
    this.emit(chemical);
  });
}

util.inherits(module.exports, Organel);