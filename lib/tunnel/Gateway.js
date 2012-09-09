var Chemical = require("../Chemical");

/**
 * 
 */
module.export = function Gateway(address, plasma) {
  var States = { "NOT_INITIALIZED":0, "INITIALIZATION":1, "RUNNING":2 };
  var transportState = States.NOT_INITIALIZED;
  
  var transport = null;
  var chemicalsPool = [];
  
  this.emit = function (chemical) {
    if (transportState === States.RUNNING) {
      transport.emit(chemical);
    } else {
      chemicalsPool.push(chemical);
      if (transportState === States.NOT_INITIALIZED) 
	this.obtainTransport();
    }
  };
  
  var This = this;
  this.transportCreated = function (_transport) {
    transport = _transport;
    transport.handleError = handleError;
    transportState = States.RUNNING;
    //clear chemicalsPool
    var pool = chemicalsPool;
    chemicalsPool = [];
    for (var i = 0; i < chemicalsPool.length; i++) {
      //in case transport fails
      This.emit(pool[i])
    }
  };
  
  var handleError = function (error) {
    //TODO: log error
    obtainTransport();
  }
  
  this.obtainTransport = function () {
    transport = null;
    transportState = States.INITIALIZATION;
    plasma.emit(new Chemical({ "type": "system.nucleus.TransportNeeded", callback: this.transportCreated }, address), this);
  };
};
