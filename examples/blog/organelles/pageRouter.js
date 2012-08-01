var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function PageRouter(plasma){
  Organel.call(this, plasma);

  this.on("httpRequest", function(chemical){
    chemical.type = "renderPage";
    chemical.page = "/index";
    if(chemical.req.url != "/")
      chemical.page = chemical.req.url;
    this.emit(chemical);
  });
}

util.inherits(module.exports, Organel);