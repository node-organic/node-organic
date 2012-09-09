//todo
var organic = require("../../index");
var Gateway = require("../../lib/tunnel/Gateway");
var Transport = require("../../lib/tunnel/Transport");
var TransportFactory = require("../../lib/tunnel/TransportFactory");

var ADDRESS = "123456";


var DNA = {
  "nucleus": {
    "transportFactory":{
      "source": "lib/tunnel/TransportFactory"
    }
  },
  "plasma": {
    "target": {
      "source": "tests/integration/ObtainLocalTransport_data/Target",
      "address":"123456"
    },
    "initial":{
       "source": "tests/integration/ObtainLocalTransport_data/Initial",
       "target":{
	 "address":"123456"
       }
    }
  },
  "membrane": {}
};

describe("TunnelCreation", function(){
  
  var cell = new organic.Cell(DNA);

  it("should deliver message", function(next){
    cell.plasma.emit(new organic.Chemical("sendMessage", next), null);
  });

});
