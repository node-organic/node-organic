var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function Router(plasma){
  Organel.call(this, plasma);

  this.plasma.on("httpRequest", function(chemical){
    chemical.type = "renderPage";
    chemical.page = "/index";
    if(chemical.req.url != "/")
      chemical.page = chemical.req.url;
    if(!plasma.emit(chemical)) {
      var pageNotFound = new Chemical();
      pageNotFound.type = "renderPage";
      pageNotFound.page = "/404";
      pageNotFound.req = chemical.req;
      plasma.emit(pageNotFound);
    }
  });
}

util.inherits(module.exports, Organel);