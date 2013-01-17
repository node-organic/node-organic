var Chemical = require("../lib/Chemical");
var Plasma = require("../lib/Plasma");

var MyChemical = Chemical.extend(function(mode){
  this.mode = mode;
});

describe("PlasmaWithFeedback", function(){
  var plasma;

  it("should create new instance", function(){
    plasma = new Plasma();
  });

  it("should transmit chemical", function(next){
    plasma.on("test", function(c, sender, callback){
      callback(c);
    });

    plasma.emit(new Chemical("test"), this, function(c){
      expect(c.type).toBe("test");
      next(); 
    });
  });
});