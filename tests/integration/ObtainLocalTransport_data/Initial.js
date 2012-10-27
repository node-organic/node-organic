var organic = require("../../../index");
var Gateway = require("../../../lib/tunnel/Gateway");

module.exports = organic.Organel.extend(function(plasma, config, parent){
  organic.Organel.apply(this, arguments);
  var gateway = new Gateway(config.target.address, plasma);

  this.on("sendMessage", function(c){
    gateway.emit(c);
  });
});

