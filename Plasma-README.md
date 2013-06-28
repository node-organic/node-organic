# usage #

    var plasma = new Plasma();
    plasma.on("PING", function(c, callback){
      callback("PONG");
    })
    plasma.emit("PING", function(c){
      console.log(c); // PONG
    })

# usage 2 #

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
      console.log(c.data); // HELLO WORLD!
    })
    
# usage 3 #

    var plasma = new Plasma();
    var decoratedPlasma = plasma.use(function(stateStore) {
        this.echo = function(value){ console.log(value); }
    });
    decoratedPlasma.echo("test"); // test
    plasma.echo("test"); // echo method not exists
