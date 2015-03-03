# An Organic concept v0.2

[Organic Computing](en.wikipedia.org/wiki/Organic_computing) inspired implementation based on nodejs.

This document represents a draft outline of the fundamental principles, understandings and concepts in engineering `node-organic` as package library named `organic` published in http://npmjs.org.

The library represents abstract form of the implementation bundled with concept documentation. 
Further [modules/libraries/packages](http://node-organic.com/#/modules) inheriting `organic` core classes provide actual implementation and the ability to extend, improve and adapt forthermore the concept and its outcome.

## [Chemical](./Chemical.md)

In standard naming conventions Chemical is raw data structure.

Every chemical has a type and in its nature is a plain object filled with properties (primitive values and/or references to other objects). 

One chemical has this generalized structure

    {
      type: String,
      // ...
      reference: Object,
      // ...
      property: Value
      // ...
      function: Function(also an Object or Class)
    }

## [Reactions](./Reactions.md)

In standard naming conventions Reactions are implementations of functions with optional callback support.

Reactions are operations performed over a chemical solution (one or more chemicals). 
Reactions take the form:
    
    function reaction(c:Chemical(s) [, done:Done]):void
    
where Done is optional and having the following definition:
    
    function done(error:Error/false, data:Chemical(s)):void

## [DNA](./DNA.md)

In standard naming conventions DNA is implementation of Configuration utilities and structure.

It is the collected internal knowledge of the entire cell application - its relations, abilities, build phases, functionalities and modes. DNA information can be acquired from various sources and can be transmited across various mediums if needed.

    var dnaStructure = {
      "OrganelleName": {
        "source": "path/to/organelle_implementation"
      },
      "branchName": {
        "OrganelleName2": "path/to/implementation"
      }
    }
    
    var dna = new DNA(dnaStructure)
    console.log(dna.OrganelleName.source) // "path/to/organelle_implementation"

## [Plasma](./Plasma.md)

In standart naming conventions Plasma is implementation of EventBus/EventDispatcher/PubSub pattern.

It is the fluid/environment which contains different kinds and copies of Organelles and/or Chemicals. The plasma also has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

    var plasma = new Plasma()
    plasma.on("ChemicalName", function(c){ /* ... chemical reaction logic ... */})
    plasma.emit({type: "ChemicalName"})

## [Organelles](./Organel.md)

In standart naming conventions Organelle is implementation of Controller/Command/Strategy pattern.

These are the building blocks of organic application. Organelles are simple class implementations having the following form:

    var Organelle = function(plasma, dna) {
      this.plasma = plasma
      plasma.on(dna.reactOn, this.reactionToChemical, this)
    }

    Organelle.prototype.reactionToChemical = function(c, next) {
      // -- reaction logic
      // -- submits new chemical in plasma via this.plasma.emit(...) 
      // -- calls next()
    }

## [Nucleus](./Nucleus.md) 

In standard naming conventions Nucles is implementation of DependencyInjector/Factory pattern.

Nucleus is an Organelle. It however has reactions vital for a living Cell - ability to process DNA and execute reactions involved in constructing Organelles. The DNA itself is a plan Chemical.

    var nucleus = new Nucleus(plasma, dna)

    // add ability to construct organelles on demand via "build" typed chemical.
    plasma.on("build", nucleus.build, nucleus) 

    // build some organelles from dna
    plasma.emit({type: "build", dna: query(dna, "organelles.plasma")})

## Cell

The standard naming conventions a Cell is called Application.

This is the abstract form of the building action. It is usually a single constructor logic which brings up Plasma and Nucles. The Cell can also provide reaction support to "build" Chemicals which are then piped to Nucleus's build implementation for execution.

    // simple cell definition
    var Cell = function Cell(dna){
      this.plasma = new Plasma()
      var nucleus = new Nucleus(this.plasma, dna)
      this.plasma.on("build", nucleus.build, nucleus)
    }

    // load dna
    var query = require("organic-dna-query")
    var loadDir = require("organic-dna-fsloader")
    var dna = new DNA()

    loadDir(dna, "cwd/relative/path/to/dna", function(){

      // instantiate 
      var instance = new Cell(dna)

      // trigger building
      instance.plasma.emit({type: "build", branch: "organelles.plasma"})
    })
    

Cells can be in different kinds - command line, web services, desktop apps. 
Cells themselfs can form up and organize into a Systems. 
Different kinds of systems can build up even more complex structures interconnecting with each other like Organisms...

-----
Note that the proposed concept and implementation doesn't reflect the actual nature order and processes. It is not a simulation of nature patterns but rather the resulted abstract form of them applicable within the Software Engineering discipline.
