var Plasma = require("../../lib/Plasma")

describe("issue test case", function(){
  var plasma = new Plasma()
  var invoked = 0

  beforeEach(function () {
    plasma.once("test", function(){
      invoked += 1
      return false
    });
    plasma.on("test", function(){
      invoked += 1
    });
  });

  it("invokes 'once' once and on every time", function(){
    plasma.emit("test")
    expect(invoked).toBe(2)
    plasma.emit("test")
    expect(invoked).toBe(3)
  })

})
