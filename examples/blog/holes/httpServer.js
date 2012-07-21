var express = require('express');
var Chemical = require("organic").Chemical;

module.exports = function HttpServer(plasma){
  var app = require('express').createServer();
  var responseClients = [];

  app.get('*', function(req, res){
    var chemical = new Chemical();
    chemical.req = req;
    chemical.type = "httpRequest";
    responseClients.push({req: req, res: res});
    plasma.emit(chemical);
  });

  // TODO this should be membrane
  plasma.on("httpResponse", function(chemical){
    for(var i = 0; i<responseClients.length; i++) {
      var client = responseClients[i];
      if(chemical.req.url == client.req.url) {
        client.res.send(chemical.data);
        responseClients.splice(i,1);
      }
    }
  });

  app.listen(1337);
  console.log('Server running at http://127.0.0.1:1337/');  
}