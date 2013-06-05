var Chemical = require("../lib/Chemical");
var Plasma = require("../lib/Plasma");

var MyChemical = Chemical.extend(function(mode){
  this.mode = mode;
});

describe("PlasmaOnce", function(){
  var plasma;

  it("should create new instance", function(){
    plasma = new Plasma();
  });

  it("should transmit chemical only once", function(next){

    plasma.once("test", function(c, sender, callback){
      plasma.once("twice", function(c){
        callback(c);
      })
      plasma.emit(new Chemical("twice"))
    });

    plasma.emit(new Chemical("test"), this, function(c){
      expect(c.type).toBe("twice");
      next(); 
    });
  });

  it("should transmit without errors", function(next){
    plasma.once("Type", function(c, sender, callback){
      plasma.once("Type", function(c, sender, callback){
        callback({data: true});
      });
      callback({data: false});
    })

    plasma.emit(new Chemical("Type"), this, function(){
      plasma.emit(new Chemical("Type"), this, function(c){
        expect(c.data).toBe(true);
        next();
      })
    });
  })
});