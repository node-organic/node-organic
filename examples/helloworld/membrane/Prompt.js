var util = require("util");
var readline = require('readline');

var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;


module.exports = function ErrorHandler(plasma){
  Organel.call(this, plasma);
  

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var self = this;
  rl.question("What do you think of node-organic? ", function(answer) {
    rl.close();
    self.emit(new Chemical("answer", answer));
  });
}

util.inherits(module.exports, Organel);
