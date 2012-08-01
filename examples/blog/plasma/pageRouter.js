var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function PageRouter(plasma){
  Organel.call(this, plasma);

  this.on("httpRequest", function(chemical){
    chemical.type = "renderPage";
    // default page - index
    chemical.page = "/index";
    
    if(chemical.req.url != "/")
      chemical.page = chemical.req.url;

    // everything which starts with admin point to /admin/index
    if(chemical.page.indexOf("/admin") == 0)
      chemical.page = "/admin/index";
    
    this.emit(chemical);
  });
}

util.inherits(module.exports, Organel);