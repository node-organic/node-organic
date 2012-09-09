//interface and inner process communication.
module.exports = {}
module.exports.interface = {
  emit: function (chemical) {},
  close: function () {},
  handleError: function (error) {}
}

module.exports.createInProcessTransport(directRef) {
  return {
    emit: function (chemical) { directRef.message(chemical); },
    close: function () { directRef = null; },
    handleError: function (error) {/* TODO */}
  };
}