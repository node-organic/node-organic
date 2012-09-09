var Organel = require("../Organel");
var Chemical = require("../Chemical");
var util = require("util");
var Transport = require("./Transport");

module.export = function TransportFactory(plasma, objectConfig, nucleus){
  Organel.call(this, plasma, objectConfig, nucleus);

  this.on("system.nucleus.TransportNeeded", function(chemical){
    var organel = nucleus.organellesMap[chemical.data];
    if (typeof organel !== "undefined") {
      if (organel.transport === null) {
	organel.transport = Transport.createInProcessTransport(organel.instance);
      }
      chemical.callback(organel.transport);
    } else {
      plasma.emit(new Chemical({ "type": "system.nucleus.ExternalTransportNeeded", callback: chemical.callback }, address), this);
    }
  });
}

util.inherits(module.exports, Organel);