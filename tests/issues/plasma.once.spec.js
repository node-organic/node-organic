var Plasma = require("../../lib/Plasma")

describe("issue plasma not kalling after once", function(){
  var plasma = new Plasma()
  var invoked = 0
  it("setup issue case", function(next){
    plasma.once("test", function(){
      invoked += 1
      return false
    })
    plasma.on("test", function(){
      invoked += 1
    })
    next()
  })

  it("runs issue case", function(next){
    plasma.emit("test")
    expect(invoked).toBe(2)
    next()
  })

  it("runs issue case second time", function(next){
    plasma.emit("test")
    expect(invoked).toBe(3)
    next()
  })

})
