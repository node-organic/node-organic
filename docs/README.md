# An Organic concept v0.2

[Organic Computing](en.wikipedia.org/wiki/Organic_computing) inspired implementation based on nodejs.

This document represents a draft outline of the fundamental principles, understandings and concepts in engineering `node-organic` as package library named `organic` published in http://npmjs.org.

The library represents abstract form of the implementation bundled with concept documentation. 
Further [modules/libraries/packages](http://node-organic.com/#/modules) inheriting `organic` core classes provide actual implementation and the ability to extend, improve and adapt forthermore the concept and its outcome.

## [Chemical](./Chemical.md)

In standard naming convesions Chemical is data structure.

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

## Reactions

In standard naming convesions Reactions are function/method calls.

Reactions are `asyncronious` operations performed over a chemical solution (one or more chemicals). Reactions (usually) take the form:
    
    function reaction(c:Chemical(s) [, done:Done]):void
    
where Done is optional and having the following definition:
    
    function done(error:Error/false, data:Chemical(s)):void
    
Reactions can be considered event handlers, with the passed chemical being the event itself. They are required to:

   * declare `done` as argument when reaction logic is asynchronious.
     * always invoke `done` once declared wither with `error` argument or with `false, data` arguments.
   * not to throw an exception.

A simple example reaction looks like the following:

    var divide = function (c, done) {
      if (c.b === 0) {
        return done(new Error("can not divide by zero"));
      }
      var result = c.a / c.b;
      done(false, result);
    }

## [Organelles](./Organel.md)

In standart naming convesions single Organelle is a Controller.

These are the building blocks of organic application, they in general are clonable components of reactions with given `self-state`. Organelles are simple class implementations having the following form:

    var Organelle = function(plasma, dna) {
      this.plasma = plasma
      plasma.on(dna.reactOn, this.reactionToChemical, this)
    }

    Organelle.prototype.reactionToChemical = function(c, next) {
      // -- reaction logic
      // -- submits new chemical in plasma via this.plasma.emit(...) 
      // -- calls next()
    }

## [Plasma](./Plasma.md)

In standart naming convesions Plasma is EventBus/EventDispatcher/PubSub Pattern.

It is the fluid/environment which contains different kinds and copies of Organelles and/or Chemicals. This is a Class(OOP) implementation with support of decorations/extensions/plugins. The plasma also has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

    var plasma = new Plasma()
    plasma.on("ChemicalName", Reaction)
    plasma.off("ChemicalName", Reaction)
    plasma.once("ChemicalName", Reaction)
    // ... any kind of plasma interaction can be achieved by decorating it.
    plasma.onAll("ChemicalName1", "ChemicalName2", Reaction)

## [Nucleus](./Nucleus.md) and [DNA](./DNA.md)

The standard naming convesions Nucles and DNA are respectively DependencyInjector/Factory and Configuration.

Nucleus is an Organelle. It however has reactions vital for a living Cell - ability to read DNA and execute reactions involved in constructing Organelles. The DNA itself is a plan Chemical.

    var dnaStructure = {
      "OrganelleName": {
        "source": "path/to/organelle_implementation"
      },
      "branchName": {
        "OrganelleName2": "path/to/implementation"
      }
    }
    
    var plasma = new Plasma()
    var query = require("organic-dna-query")
    var dna = new DNA(dnaStructure)

    // construct Nucleus giving its own dna branch for configuration.
    var nucleus = new Nucleus(plasma, query(dna, "nucleus"))

    // add ability to construct organelles on demand via "build" typed chemical.
    plasma.on("build", nucleus.build, nucleus) 

    // build some organelles from dna
    plasma.emit({type: "build", dna: query(dna, "organelles.plasma")})

## [Cell](./Cell.md)

The standard naming convesion a Cell is called Application.

This is the abstract form of the action of building. It is usually a single constructor logic which brings up Plasma and Nucles. The Cell can also provide an reaction support to "build" Chemicals which are then piped to Nucleus for execution.

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