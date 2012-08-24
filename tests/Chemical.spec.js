var Chemical = require("../lib/Chemical");

describe("Chemical", function(){
  it("should create new instance", function(){
    c = new Chemical();
  });

  it("should create new instance with given type and data", function(){
    c = new Chemical("value", {prop: "v"});
    expect(c.type).toBe("value");
    expect(c.data.prop).toBe("v");
  });

  it("should create new instance with given data", function(){
    c = new Chemical({type: "value", data: {prop: "v"}});
    expect(c.type).toBe("value");
    expect(c.data.prop).toBe("v");
  });
});