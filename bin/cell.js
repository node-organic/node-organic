#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var Cell = require("../lib/Cell");

var readDNA = function(dnaPATH){
  fs.readFile(dnaPATH, function(err, data){
    if(err) throw err;
    try {
      var dnaData = JSON.parse(data.toString());
    } catch(e){
      throw new Error("could not parse DNA at "+dnaPATH);
    }
    var cell = new Cell(dnaData);
  });
}

if(process.env.DNA)
  readDNA(process.env.DNA);
else
  process.env.DNA = process.cwd()+"/dna.json";

path.exists(process.env.DNA, function(exists){
  if(exists)
    readDNA(process.env.DNA)
  else
    throw new Error(process.env.DNA+" not found");
});