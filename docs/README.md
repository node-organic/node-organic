# An Organic concept

## Chemicals

Every chemical has a name and its nature is as plain object filled with properties (primitive values and/or references to other objects). A Chemical having references to other objects can be envisioned as ChecamilCompount. It is wise to have compounts serializable(usually providing toJSON method), as one can never know to where the chemicals could travel.

So one chemical has this generalized structure

    {
      name: String,
      reference: Object,
      // ...
      property: Value
      // ...
      function: Function(also an Object or Class)
      // ...
      toJSON: function(){}
    }

## Reactions

That is the `actual work been done` over chemicals. Also it can be reffered as the chains of logic forming reactions to given `incoming` (such as user, browser agent or other) actions.

By definition one reaction is triggered with incoming Chemical or ChemicalCompount and can thereafter decide to aggragete the it (referred for simplicity as `c`), pass it as output to the next reaction if any (referred as `next`) or do both.

One general reaction to a chemical is having this simple form:

    var reaction = function(c, next) {
      if(err) return next && next(err) // optional
      // .... do some actual work on `c`
      next && next(c || new Chemical) // optional
    }

It is then suitable to map reactions also as Chemical transformations, persistance/storage, rendering & etc.
Reactions however can go with other forms in different contexts. For example in `http` context a wide used reaction form is as follows:

    var reaction = function(req, res, next) {
      if(err) return next && next(err) // optional
      // req and res are refferenced objects of a single Chemical usually in organic implementations.
      next && next(req, res, next) // optional
    }

or

    var reaction = function(err, req, res, next) {
      if(err) return next && next(err) // optional
      // err, req and res are refferenced objects of a single Chemical usually in organic implementations.
      next && next(err, req, res, next) // optional
    }

Having a single reaction however does have ability to execute sub-reactions. Reactions also are usually chained (executed sequencially one by one) in the form of a single reaction or based on given properties and values of the Chemical are split/switched between different reactions.

All these are usually provided as reaction builder/helpers as packages such as organic-alchemy

## Organelles

These are the building blocks of organic ecosystem, they in general are colonable components of reactions with given `self-state`. Usually organelles are simple class (OOP) implementations having the following form:

    var Organelle = function(plasma, dna) {
      // plasma, dna are dependency injected properties when the Organelle is used within organic living cell.
      // ... organelle construction work
      plasma.on("ChemicalName", this.reactionToChemical) // suitable only within organic living cell
    }

    Organelle.prototype.reactionToChemical = function(c, next) {
      // ...reaction logic
    }

So having different types of organelles which can be instantiated/created at will is like forming a living Cell.

In standart naming convesions single Organelle is a Controller.

## Plasma

It is the fluid/environment which contains different kinds and copies of Organelles. This is a Class(OOP) implementation usually with support of decorations/extensions/plugins. The plasma also has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

    var plasma = new Plasma()
    plasma.on("ChemicalName", Reaction)
    plasma.off("ChemicalName", Reaction)
    plasma.once("ChemicalName", Reaction)
    // ... any kind of plasma interaction can be achieved by decorating it.
    plasma.onAll("ChemicalName1", "ChemicalName2", Reaction)

In standart naming convesions Plasma is also referred as EventBus.

## Nucleus and DNA

This is an Organelle. It however has reactions vital of a living Cell - ability to read DNA and execute reactions involved in constructing Organelles. The DNA itself is a plan Chemical. Usually Nucleus organelles doesn`t react to Chemicals emitted into Plasma by themselfs, that is purpose of the Cell.

    var dnaStructure = {
      "OrganelleName": {
        "source": "path/to/organelle_implementation"
      },
      "branchName": {
        "OrganelleName2": "path/to/implementation"
      }
    }
    var dna = new DNA(dnaStructure)
    var nucleus = new Nucleus(dna)
    nucleus.build({"branch": ""}) // triggers building of "OrganelleName"
    nucleus.build({"branch": "branchName"}) // triggers building of "OrganelleName2"

The standard naming convesions of Nucles and DNA are respectively DependencyInjector and Configuration.

## Cell

This is the abstract form of the action of birth of a living Cell. It is usually a single constructor logic which brings up Plasma and Nucles. Most of the cases the Cell also provides an reaction support to "build" Chemicals which are then piped to Nucleus for execution.

    var Cell = function Cell(dna){
      this.plasma = new Plasma();
      var nucleus = new Nucleus(this.plasma, dna);
      this.plasma.on("build", nucleus.build)
    }
    var instance = new Cell(/* DNA */)
    instance.plasma.emit("build", {"branch": "..."}) // triggers reaction in creating Organelles

The standard naming convesion of a Cell is called Application.

Thus Cells can have different kinds - command line, web services, desktop apps. Cells themselfs can form up and organize into a Systems. Different kinds of systems can build up even more complex structures interconnecting with each other like Organisms...
