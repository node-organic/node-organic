var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;
var cons = require("consolidate");
var fs = require("fs");
var path = require("path");

module.exports = function Page(plasma){
  Organel.call(this, plasma);

  plasma.on("renderPage", function(chemical){
    if(!chemical.page)
      throw new Error("recieving chemical without page");
    
    var found = path.existsSync(process.cwd()+"/template"+chemical.page+".jade");
    if(found)
      cons.jade(process.cwd()+"/template"+chemical.page+".jade", chemical.data || {}, function(err, renderedData){
        //if(err) ;
        var response = new Chemical();
        response.type = "httpResponse";
        response.data = renderedData;
        response.req = chemical.req;
        plasma.emit(response);
      });

    return found;
  });
}

util.inherits(module.exports, Organel);