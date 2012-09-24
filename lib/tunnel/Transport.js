/**
 * Tranport is a connection to an object that provides message(chemical) method. Usually this object is going to be an Organel
 * This module provides the interface and inner process communication implementation.
 */
module.exports = {}
module.exports.interface = {
  emit: function (chemical) {},
  close: function () {},
  handleError: function (error) {}
}

module.exports.createInProcessTransport = function (directRef, plasma) {
  return {
    emit: function (chemical) { 
    	if (directRef !== null)
    		directRef.message(chemical);
    	else
    		this.handleError({"message": "transport closed", "type": "TransportClosed"}); 
    },
    close: function () {
    	var t = this;
    	plasma.emit({ "type":"system.nucleus.TransportRelease", "transport": t}); 
    	directRef = null;
    },
    handleError: function (error) {
    	/* default implementation. Gateway should replace this method */
    	console.log(error);
    }
  };
}