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
    organel.on("test", function(c){
      expect(c.type).toBe("test");
      next();
    });
    organel2.emit(new Chemical("test"));
  });

  it("should transmit chemical with type", function(next){
    organel.on(MyChemical, function(c){
      expect(c.mode).toBe("test");
      next();
    });
    organel2.emit(new MyChemical("test"));
  });

  it("should notify listener for chemical only once", function(){
    var c = 0;
    organel.once("test2", function(){
      c += 1;
    });
    organel2.emit(new Chemical("test2"));
    organel2.emit(new Chemical("test2"));
    expect(c).toBe(1);
  });

  it("should unregister listerner for chemical", function(){
    var c = 0;
    var m = function(){
      c += 1;
    }
    organel.on("test3", m);
    organel2.emit(new Chemical("test3"));
    organel.off("test3", m);
    organel2.emit(new Chemical("test3"));
    expect(c).toBe(1);
  });
});