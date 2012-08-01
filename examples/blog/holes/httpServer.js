var util = require("util");
var express = require('express');
var Chemical = require("organic").Chemical;
var Organel = require("organic").Organel;

module.exports = function HttpServer(plasma){
  Organel.call(this, plasma);

  var app = require('express').createServer();
  var responseClients = [];
  var self = this;

  app.get('*', function(req, res){
    var chemical = new Chemical();
    chemical.req = req;
    chemical.type = "httpRequest";

    // store incoming req, res to be able to respond on httpResponse chemical.
    responseClients.push({req: req, res: res});

    // finally emit to the plasma/membrane?
    self.emit(chemical);
  });

  // TODO this should be membrane
  self.on("httpResponse", function(chemical){
    for(var i = 0; i<responseClients.length; i++) {
      var client = responseClients[i];
      if(chemical.req.url == client.req.url) {
        client.res.send(chemical.data);
        responseClients.splice(i,1);
      }
    }
  });

  app.listen(1337);
  console.log('HttpServer running at http://127.0.0.1:1337/');  
}

util.inherits(module.exports, Organel);