/**
 * Test Transport.createInProcessTransport(ref)
 */
 
 var Transport = require("../lib/tunnel/Transport"); 
 
 describe("Transport", function(){
   var fakePlasma = { "emit": function () {} };
 
  it("should return an object that provides emit and close methods as described in the interface", function(){
  	var target = {}
  	
  	var transport = null;
  	expect(function () {
  		transport = Transport.createInProcessTransport(target, fakePlasma);
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
  		var transport = Transport.createInProcessTransport(target, fakePlasma);
  		transport.emit(chemical);
    }).not.toThrow();
  });
  
  it("should not message the object if closed but should raise an error either", function (next) {
  	var chemical = { "success": true };
  	var target = {
  		"message": function (chem) {
  			expect(false).toBe(true); //fail
  		}
  	};
  	expect(function () {
  		var transport = Transport.createInProcessTransport(target, {
  		//recieves event for detachment of transport 
  			"emit": function (e) {
  				expect(e.type).toEqual("system.nucleus.TransportRelease");
  			} 
  		});
  		
  		transport.close();
  		
  		//will recieve the error
  		transport.handleError = function (error) {
  			expect(error).toEqual({"message": "transport closed", "type": "TransportClosed"});
  			next();
  		};
  		transport.emit(chemical);
    }).not.toThrow();
  });
  
});