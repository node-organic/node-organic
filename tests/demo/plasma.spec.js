describe("Plasma",function(){
  var Plasma = require("../../index").Plasma;

  it('shows demo', function(next){
    var plasma = new Plasma();
    plasma.on("SAY", function(c, callback){
      c.data += "HELLO";
      return false;
    })
    plasma.on("SAY", function(c, callback){
      c.data += " WORLD!";
      callback(c);
    })
    plasma.emit({type: "SAY", data:""}, function(c){
      expect(c.data).toBe("HELLO WORLD!");
      next();
    })
  })
})