# An Organic concept

## Chemicals

Every chemical has a type and in its nature is a plain object filled with properties (primitive values and/or references to other objects). A Chemical having references to other objects can be envisioned as ChemicalCompound. It is wise to have compounds serializable(usually providing toJSON method), as one can never know where the chemicals could travel to.

So one chemical has this generalized structure

    {
      type: String, //or constructor: Function
      reference: Object,
      // ...
      property: Value
      // ...
      function: Function(also an Object or Class)
      // ...
      toJSON: function(){}
    }

## Reactions

Reactions are `asyncronious` operation performed over a chemical solution (one or more chemicals). Reactions (usually) take the form:
    
    function aReaction(c:Chemical(s), done:Done):void
    
where Done is:
    
    function aDone(error:Error/false, data:Chemical(s)):void
    
The done callback is invoked only once during reaction execution, with either error or result (data).
Furthermore, Reactions can be considered event handlers, with the passed chemical being the event itself. As such they can handle given incoming actions (from user, browser agent or other). 

Individual reactions are responsible to specify in their contract:

   * the type of chemical(s) they accept and the type of chemical(s) they pass as results. Errors are always of type `Error`. 
   * is the chemical passed to them modified during the reaction.
   * is null/undefined a valid result on success. Searching reactions are encouraged to do so if the result is "not found" (opposed to returning an error).


Reactions are required to:

   * invoke `done` ONCE. Reactions are usually grouped in chains, failure to invoke done will send the whole chain in blocked state.
   * invoke `done` either with `error` or `false, data`.
   * not to throw an exception.

A simple example reaction will look like this:

    var divide = function (c, done) {
      if (c.b === 0) {
        done (new Error("can not divide by zero"));
      }
      var result = c.a / c.b;
      done(false, result);
    }

Reactions also are usually chained (executed sequencially one by one) in the form of a single reaction or based on given properties and values of the Chemical are split/switched between different reactions.

All these are usually provided as reaction builder/helpers within packages such as:

 * [reactions](https://github.com/vbogdanov/reactions)
 * [organic-alchemy](https://github.com/outbounder/organic-alchemy)

## Organelles

These are the building blocks of organic ecosystem, they in general are clonable components of reactions with given `self-state`. Usually organelles are simple class implementations having the following form:

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
