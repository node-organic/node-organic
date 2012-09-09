var Chemical = require("../Chemical");

/**
 * 
 */
module.exports = function Gateway(address, plasma) {
  var States = { "NOT_INITIALIZED":0, "INITIALIZATION":1, "RUNNING":2 };
  var transportState = States.NOT_INITIALIZED;
  
  var transport = null;
  var chemicalsPool = [];
  
  this.emit = function (chemical) {
    console.log(transportState);
    if (transportState === States.RUNNING) {
      transport.emit(chemical);
    } else {
      chemicalsPool.push(chemical);
      if (transportState === States.NOT_INITIALIZED) 
	this.obtainTransport();
    }
  };
  
  var This = this;
  var transportCreated = function (_transport) {
    console.log(_transport);
    transport = _transport;
    transport.handleError = handleError;
    transportState = States.RUNNING;
    //clear chemicalsPool
    var pool = chemicalsPool;
    chemicalsPool = [];
    for (var i = 0; i < pool.length; i++) {
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
    plasma.emit({ "type": "system.nucleus.TransportNeeded", callback: transportCreated, "address": address });
  };
  
  this.close = function () {
    transport.close();
  }
};
