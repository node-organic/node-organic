var Chemical = require("../lib/Chemical");
var Plasma = require("../lib/Plasma");
var Organel = require("../lib/Organel");

var MyChemical = Chemical.extend(function(mode){
  this.mode = mode;
});

describe("Organel", function(){
  var plasma = new Plasma();
  var organel;
  var organel2;

  it("should create new instance", function(){
    organel = new Organel(plasma);
    organel2 = new Organel(plasma);
  });

  it("should transmit chemical", function(next){
    organel.on("test", function(c, sender, callback){
      callback(c);
    });
    organel2.emit(new Chemical("test"), function(c){
      expect(c.type).toBe("test");
      next();
    });
  });

});