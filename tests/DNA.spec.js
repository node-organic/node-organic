var DNA = require("../lib/DNA");

describe("DNA", function(){
  var dna;

  it("should return DNA instance on new", function(){
    dna = new DNA();
    expect(dna instanceof DNA).toBe(true);
  });

  it("should create branch using namespace path", function(){
    dna.createBranch("test.node");
    expect(dna.test).toBeDefined();
    expect(dna.test.node).toBeDefined();
  });

  it("should create branch using namespace path and give it value", function(){
    dna.createBranch("test.node2", {
      node: "value"
    });
    expect(dna.test).toBeDefined();
    expect(dna.test.node).toBeDefined();
    expect(dna.test.node2).toBeDefined();
    expect(dna.test.node2.node).toBe("value");
  });

  it("should select branch using namespace path", function(){
    var branch = dna.selectBranch("test.node2");
    expect(branch).toBeDefined();
    expect(branch.node).toBe("value");
  });

  it("should load dna data from json", function(next){
    dna.loadFile(__dirname+ "/data/dna.json", function(){
      expect(dna.membrane2).toBeDefined();
      expect(dna.membrane2.organel1).toBeDefined();
      expect(dna.membrane2.organel1.source).toBeDefined();
      next();
    });
  });

  it("should load dna data from json at targetBranch", function(next){
    dna.loadFile(__dirname+ "/data/membrane3.json", "test.membrane3.jsonvalue", function(){
      expect(dna.test.membrane3).toBeDefined();
      expect(dna.test.membrane3.jsonvalue.organel1).toBeDefined();
      expect(dna.test.membrane3.jsonvalue.organel1.source).toBeDefined();
      next();
    });
  });

  it("should load dna data from folder", function(next){
    dna.loadDir(__dirname+ "/data/dna", function(){
      expect(dna.plasma).toBeDefined();
      expect(dna.plasma.organel1).toBeDefined();
      expect(dna.plasma.organel1.source).toBeDefined();
      expect(dna.membrane).toBeDefined();
      expect(dna.membrane.organel1).toBeDefined();
      expect(dna.membrane.organel1.type).toBeDefined();
      expect(dna.development.membrane).toBeDefined();
      expect(dna.development.membrane.organel2).toBeDefined();
      expect(dna.development.membrane.organel2.source).toBeDefined();
      next();
    });
  });

  it("should deep merge dna data node properly", function(){
    dna.mergeBranchInRoot("development");

    expect(dna.membrane.organel2).toBeDefined();
    expect(dna.membrane.organel2.source).toBeDefined();
    expect(dna.membrane.organel1).toBeDefined();
    expect(dna.membrane.organel1.source).toBeDefined();
    expect(dna.membrane.organel1.config).toBeDefined();
  });

  it("should map directory to branch", function(){
    dna = new DNA();
    expect(dna instanceof DNA).toBe(true);
    dna.mapDirectoryToBranch("data", __dirname+"/data", function(){
      expect(dna.data).toBeDefined();
      expect(dna.data.Organel).toBeDefined();
      expect(dna.data.Organel.source).toBeDefined();
    })
  })
})