# An Organic concept

## [Chemical](./Chemical.md)

In standard naming convesions Chemical is data structure.

Every chemical has a type and in its nature is a plain object filled with properties (primitive values and/or references to other objects). It is wise to have chemicals serializable usually providing toJSON method.

One chemical has this generalized structure

    {
      type: String, /* not needed if using Chemical object inheritance */
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
    
    function aReaction(c:Chemical(s), done:Done):void
    
where Done is:
    
    function aDone(error:Error/false, data:Chemical(s)):void
    
Furthermore, Reactions can be considered event handlers, with the passed chemical being the event itself. As such they can handle given incoming actions (from user, browser agent or other). 

Individual reactions are responsible to specify in their contract:

   * the type of chemical(s) they accept and the type of chemical(s) they pass as results. Errors are always of type `Error`. 
   * is the chemical passed to them modified during the reaction.
   * is null/undefined a valid result on success. Searching reactions are encouraged to do so if the result is "not found" (opposed to returning an error).


Reactions are required to:

   * invoke `done`. Reactions are usually grouped in chains, failure to invoke done will send the whole chain in blocked state.
   * invoke `done` either with `error` argument or with `false, data` arguments.
   * not to throw an exception.

A simple example reaction looks like this:

    var divide = function (c, done) {
      if (c.b === 0) {
        done (new Error("can not divide by zero"));
      }
      var result = c.a / c.b;
      done(false, result);
    }

## [Organelles](./Organel.md)

In standart naming convesions single Organelle is a Controller.

These are the building blocks of organic application, they in general are clonable components of reactions with given `self-state`. Organelles are simple class implementations having the following form:

    var Organelle = function(plasma, dna) {
      this.plasma = plasma
      plasma.on(dna.reactOn, this.reactionToChemical)
    }

    Organelle.prototype.reactionToChemical = function(c, next) {
      // -- reaction logic
      // -- submits new chemical in plasma via plasma.emit(...) 
      // -- calls next()
    }

## [Plasma](./Plasma.md)

In standart naming convesions Plasma is EventBus/EventDispatcher/PubSub Pattern.

It is the fluid/environment which contains different kinds and copies of Organelles and/or Chemicals. This is a Class(OOP) implementation usually with support of decorations/extensions/plugins. The plasma also has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

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

The standard naming convesion of a Cell is called Application.

This is the abstract form of the action of birth of a living Cell. It is usually a single constructor logic which brings up Plasma and Nucles. Most of the cases the Cell also provides an reaction support to "build" Chemicals which are then piped to Nucleus for execution.

    var Cell = function Cell(dna){
      this.plasma = new Plasma()
      var nucleus = new Nucleus(this.plasma, dna)
      this.plasma.on("build", nucleus.build)
    }

    var query = require("organic-dna-query")
    var loadDir = require("organic-dna-fsloader")
    var dna = new DNA()

    loadDir(dna, "cwd/relative/path/to/dna", function(){
      var instance = new Cell(dna)
      // trigger reaction in creating Organelles
      instance.plasma.emit({type: "build", branch: "organelles.plasma"})
    })
    

Cells can be in different kinds - command line, web services, desktop apps. 
Cells themselfs can form up and organize into a Systems. 
Different kinds of systems can build up even more complex structures interconnecting with each other like Organisms...