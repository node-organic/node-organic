var Chemical = require("../lib/Chemical");
var Plasma = require("../lib/Plasma");

var MyChemical = Chemical.extend(function(mode){
  this.mode = mode;
});

describe("Plasma", function(){
  var plasma;

  it("should create new instance", function(){
    plasma = new Plasma();
  });

  it("should transmit chemical", function(next){
    plasma.on("test", function(c){
      expect(c.type).toBe("test");
      next();
    });
    plasma.emit(new Chemical("test"));
  });

  it("should transmit chemical with type", function(next){
    plasma.on(MyChemical, function(c){
      expect(c.mode).toBe("test");
      next();
    });
    plasma.emit(new MyChemical("test"));
  });

  it("should notify listener for chemical only once", function(){
    var c = 0;
    plasma.once("test2", function(){
      c += 1;
    });
    plasma.emit(new Chemical("test2"));
    plasma.emit(new Chemical("test2"));
    expect(c).toBe(1);
  });

  it("should unregister listerner for chemical", function(){
    var c = 0;
    var m = function(){
      c += 1;
    }
    plasma.on("test3", m);
    plasma.emit(new Chemical("test3"));
    plasma.off("test3", m);
    plasma.emit(new Chemical("test3"));
    expect(c).toBe(1);
  });
});