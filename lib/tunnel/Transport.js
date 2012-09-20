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

module.exports.createInProcessTransport = function (directRef) {
  return {
    emit: function (chemical) { directRef.message(chemical); },
    close: function () { directRef = null; },
    handleError: function (error) {/* TODO */}
  };
}