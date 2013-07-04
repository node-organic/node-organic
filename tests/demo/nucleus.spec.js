describe("Nucleus demo", function(){
  var Nucleus = require("../../index").Nucleus;
  
  it("usage 1", function(){
    var nucleus = new Nucleus({}, {
      "branchName": {
        "organelleName": {
          "source": "lib.Organel"
        }
      }
    })

    var organels = nucleus.build({
      "branch": "branchName"
    })
    expect(organels.length).toBe(1);

    var organel = nucleus.buildOne({
      "source": "lib.Organel"
    })
    expect(organel).toBeDefined();
  })

  it("usage 2", function(next){
    var _plasma = {};
    var nucleus = new Nucleus(_plasma, {
      "branchX": {
        "organelY": {
          "key": "value",
          "source": function(plasma, config, nucleus){
            expect(config.key).toBe("value");
            expect(plasma).toBe(_plasma);
            expect(nucleus).toBeDefined();
            next();
          }
        }
      }
    })
    var organelles = nucleus.build({"branch": "branchX"});
    expect(organelles.length).toBe(1);
    expect(typeof organelles[0] == "object").toBe(true)
  })
})