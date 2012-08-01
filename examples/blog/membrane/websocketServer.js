var util = require("util");
var socketio = require('socket.io');
var Chemical = require("organic").Chemical;
var Organel = require("organic").Organel;

module.exports = function WebsocketServer(plasma){
  Organel.call(this, plasma);

  this.on("httpServerReady", function(chemical){
    console.log('socket.io attached');
    // TODO
  });
}

util.inherits(module.exports, Organel);