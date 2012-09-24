/**
 * Test Transport.createInProcessTransport(ref)
 */
 
 var Transport = require("../lib/tunnel/Transport"); 
 
 describe("Transport", function(){
  it("should return an object that provides emit and close methods as described in the interface", function(){
  	var target = {}
  	
  	var transport = null;
  	expect(function () {
  		transport = Transport.createInProcessTransport(target);
    }).not.toThrow(); 
    
    expect(transport).toBeTruthy();
    expect(typeof transport.emit).toBe("function");
    expect(typeof transport.close).toBe("function");
  });
  
  it("should invoke the message(chem) method of the target when emit is invoked", function (next) {
  	var chemical = { "success": true };
  	var target = {
  		"message": function (chem) {
  			expect(chem).toEqual(chemical);
  			next();
  		}
  	};
  	expect(function () {
  		var transport = Transport.createInProcessTransport(target);
  		transport.emit(chemical);
    }).not.toThrow();
  });
  
  //TODO: test close
});