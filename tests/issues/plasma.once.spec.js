var Plasma = require("../../lib/Plasma")

describe("issue test case", function(){
  var plasma = new Plasma()
  var invoked = 0

  it("when attaching once and on handlers on plasma", function(){
    plasma.once("test", function(){
      invoked += 1
      return false
    })
    plasma.on("test", function(){
      invoked += 1
    })

    describe("should invoke", function(){
      it("'once' and 'on' handlers on test chemical", function(){
        plasma.emit("test")
        expect(invoked).toBe(2)
      })
      it("only 'on' handler on second test chemical", function(){
        plasma.emit("test")
        expect(invoked).toBe(3)
      })
    })
  })
})
