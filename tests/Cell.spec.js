var DNA = require("../lib/DNA");
var Cell = require("../lib/Cell");
describe("Cell", function(){
  it("should create instance of Cell", function(){
    cell = new Cell();
    expect(cell instanceof Cell).toBe(true);
  });
  it("should create instance of Cell using DNA file", function(next){
    var dna = new DNA();
    dna.loadFile(__dirname+"/data/dna.json", function(){
      cell = new Cell(dna);
      expect(cell instanceof Cell).toBe(true);  
      next();
    });
  });
  it("should create instance of Cell using DNA directory", function(next){
    var dna = new DNA();
    dna.loadDir(__dirname+"/data/dna", function(){
      cell = new Cell(dna);
      expect(cell instanceof Cell).toBe(true);  
      next();
    });
  });
});