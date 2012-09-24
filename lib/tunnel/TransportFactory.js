var Organel = require("../Organel");
var Chemical = require("../Chemical");
var util = require("util");
var Transport = require("./Transport");

var remove = function(object) {
  var index = this.indexOf(object);
  return this.splice(index, 1);
};

module.exports = function TransportFactory(plasma, objectConfig, nucleus){
  Organel.call(this, plasma, objectConfig, nucleus);

  this.on("system.nucleus.TransportNeeded", function(chemical){
    var organel = nucleus.organellesMap[chemical.address];
    if (typeof organel !== "undefined") {
      //lazy init
      if (typeof organel.transports === "undefined") {
    	organel.transports = [];
    	organel.transports.remove = remove;
      }
      
	  var tran = Transport.createInProcessTransport(organel.instance, plasma);
	  organel.transports.push(tran);
      chemical.callback(tran);
    } else {
      this.emit(new Chemical({ "type": "system.nucleus.ExternalTransportNeeded", callback: chemical.callback, "address": chemical.address }));
    }
  });
  
  this.on("system.nucleus.TransportRelease", function (chemical) {
  	var organel = nucleus.organellesMap[chemical.address];
  	organel.transporsts.remove(chemical.transport);
  });
}

util.inherits(module.exports, Organel);
