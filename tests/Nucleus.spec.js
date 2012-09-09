var Nucleus = require("../lib/Nucleus");
var Organel = require("../lib/Organel");

describe("Nucleus", function(){
  
  it("should create new instance", function(){
    nucleus = new Nucleus();
  });

  it("should createNamespace of objects", function(){
    nucleus = new Nucleus({
      "objects": {
        "MyObject1": {
          "source": "lib.Organel"
        },
        "MyObject2": {
          "source": "lib.Organel"
        }
      }
    }, {});

    var objects = nucleus.createNamespace("objects");
    expect(objects[0] instanceof Organel).toBe(true);
  });
});