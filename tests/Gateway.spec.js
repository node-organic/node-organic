/**
 * Test Gateway
 */
 
 var Gateway = require("../lib/tunnel/Gateway");
 var transport = require("../lib/tunnel/Transport");
 var transportMock = transport.interface; 
 
 describe("Gateway", function(){
  it("new Gateway(addr, plasma) should create instance of Gateway and not try to obtain transport", function(){
  	var address = "targetAddressIsString";
  	var plasma = { 
  		"emit":function(){
	  		//fail if invoked
	  		expect(false).toBe(true);
  		} 
  	};
  	
  	var gate = null;
  	expect(function () {
  		new Gateway(address, plasma);
    	gate = new Gateway(address, plasma);
    }).not.toThrow(); 
    
    expect(gate instanceof Gateway).toBe(true);
  });
  
  it("Gateway.obtainTransport should message the Cell Plasma asking for transport", function(next){
  	//{ "type": "system.nucleus.TransportNeeded", callback: transportCreated, "address": address }
 	var address = "targetAddressIsString";
    var plasma = { 
    	"emit":function(chemical){
	    	expect(chemical.type).toEqual("system.nucleus.TransportNeeded");
	    	expect(typeof chemical.callback).toEqual("function");
	    	expect(chemical.address).toBe(address);
	    	
	    	expect(function () {
	    		chemical.callback(transportMock);
	    	}).not.toThrow(); //return transport
	    	next();
    	} 
    };
 
    var gate = new Gateway(address, plasma);
    gate.obtainTransport();     
  });
  
  it("Gateway.emit(chem) should init obtaining transport and deliver the message to the transport provided", function(next){
  	var chem = { "success": true };
  
  	var tr = Object.create(transportMock);
  	tr.emit = function (chem) {
  		expect(chem.success).toBe(true);
  		next();
  	}; 
  	
    var address = "targetAddressIsString";
    var plasma = { 
    	"emit":function(chemical){
    		expect(chemical.address).toBe(address);
	    	expect(function () {
	    		chemical.callback(tr);
	    	}).not.toThrow(); //return transport
    	} 
    };
 
    var gate = new Gateway(address, plasma);
    gate.emit(chem);
  });
  
  //TODO: Gateway.close();
});
