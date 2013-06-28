describe("Plasma", function(){
  var Plasma = require("../../index").Plasma;

  it('creates plasma, decorates it and uses the decoration features', function(){
    var plasma = new Plasma();
    var decoratedPlasma = plasma.use(function(stateStore) {
        this.echo = function(value){ console.log(value); }
    });
    decoratedPlasma.echo("test"); // test
    expect(plasma.echo).not.toBeDefined(); // echo method not exists  
  })

  it('creates plasma and emitted chemical is captured by decorated plasma', function(){
    var plasma = new Plasma();
    var decoratedPlasma = plasma.use(function(stateStore) {
        this.echo = function(value){ console.log(value); }
    });
    
    decoratedPlasma.on("test", function(c){
      expect(c).toBeDefined();
    })
    plasma.emit("test", {});
  })

  it('creates plasma and emitted chemical is captured by plasma', function(){
    var plasma = new Plasma();
    var decoratedPlasma = plasma.use(function(stateStore) {
        this.emitTest = function(){ this.emit("test",{}) }
    });
    
    plasma.on("test", function(c){
      expect(c).toBeDefined();
    })
    decoratedPlasma.emitTest();
  })

});