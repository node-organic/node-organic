describe("cell demo", function(){
  var Cell = require("../../index").Cell;

  it("usage 1", function(){
    var cell = new Cell({
      "plasma-organelles": {
        "Organel1": {
          "source": "lib/Organel"
        },
        "Organel2": {
          "source": "lib/Organel"
        }
      }
    });
    var initChemical = {
      "type": "build",
      "branch": "plasma-organelles"
    }
    cell.emit(initChemical, function(organelles){
      expect(organelles.length).toBe(2);  
    });
  })

  it("usage 2", function(){
    var cell = new Cell();
    cell.emit({
      "type": "build",
      "source": "lib.Organel"
    }, function(organelle){
      expect(organelle).toBeDefined();
    })
  })

  it("usage 3", function(){
    var cell = new Cell();
    cell.emit({
      "type": "build",
      "source": function(plasma, config) {}
    }, function(organelle){
      expect(organelle).toBeDefined();
    })
  })
})