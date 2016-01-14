# [node-organic](http://node-organic.com)

# Organic v1.0.0

A concept & abstract implementation inspired by [Organic Computing](en.wikipedia.org/wiki/Organic_computing) usable for rapid software development having the following properties:

* Self-configuration
* Self-optimization
* Self-protection
* Self-reflection

The package represents abstract form of the implementation bundled with concept documentation.
Further [modules/libraries/packages](http://node-organic.com/#/modules) inheriting `organic` core classes provide actual implementation and the ability to extend, improve and adapt furthermore the concept and its practical results.

`node-organic`(or just `organic`) is based on the nature's patterns for structural organization, control flow & etc. Its base abstract ground is found to be the usable for rapid engineering of complex systems.

Organic software development thereafter mimics nature's pattern for living cells representing their organization and structure within software applications.

Main primitives of the conceptual implementation are listed bellow in this document. **Note that the terminology is intentionally chosen because every primitive comes with nature's fundamental properties/abilities/features proven to be naturally scalable/extendable**

## [Chemical](./docs/Chemical.md)

Chemical **is raw data structure**.

Every chemical has a type and in its nature is a plain object filled with properties (primitive values and/or references to other objects).

One chemical has this generalized structure

    {
      type: String,
      // ... other custom properties
    }

## [DNA](./docs/DNA.md)

DNA is **configuration**.

It is the collected internal knowledge of the entire cell application - its relations, abilities, build phases, functionalities and modes. DNA information can be acquired from various sources and can be transmitted across various mediums if needed because it is a Chemical (raw data structure)

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

## [Plasma](./docs/Plasma.md)

Plasma is **EventBus/EventDispatcher/PubSub pattern**.

It is the fluid/environment which contains different kinds and copies of Organelles and/or Chemicals. The plasma also has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

    var plasma = new Plasma()
    plasma.on(chemicalPattern, chemicalReactionFn)
    plasma.emit(chemical)

Implementations:

* [organic-plasma](https://github.com/outbounder/organic-plasma)

## [Organelles](./docs/Organel.md)

Organelle is **Controller/Command/Strategy pattern**.

These are the building blocks of organic application. Organelles are simple class implementations having the following form:

    var Organelle = function(plasma, dna) {
      this.plasma = plasma
      plasma.on(dna.reactOn, self.reactionToChemical)
    }

    Organelle.prototype.reactionToChemical = function(c) {
      // -- reaction logic
    }

## [Nucleus](./docs/Nucleus.md)

Nucles is **DependencyInjector/Factory pattern**.

Nucleus is an `Organelle`. It however has reactions vital for a 'living' Cells - ability to process DNA and execute reactions involved in constructing Organelles.

    var nucleus = new Nucleus(plasma, dna)

    // add ability to construct organelles on demand via "build" typed chemical.
    plasma.on({type: "build"}, function(c){ nucleus.build(c) })

    // build some organelles from dna
    plasma.emit({type: "build", branch: dna.organelles})

Implementations:

* [organic-nucleus](https://github.com/outbounder/organic-nucleus)

## [Cell](./docs/Cell.md)

Cell is **Application**.

It is usually a single constructor logic which brings up Plasma and Nucleus. The Cell also can provide support to "build" organelles using `build` chemicals.

    // dna/organelles.json
    {
      "plasma": {
        "organelle": {
          "source": "path/relative/to/cwd"
        }
      }
    }

    // cell.js
    var Cell = function Cell(dna){
      this.plasma = new Plasma()
      var nucleus = new Nucleus(this.plasma, dna)
      this.plasma.on("build", nucleus.build, nucleus)
    }

    // main.js
    var loadDNA = require('organic-dna-loader')
    loadDNA(function(err, dna){

      // instantiate
      var instance = new Cell(dna)

      // trigger building
      instance.plasma.emit({type: "build", branch: "organelles.plasma"})
    })


Cells can be in different kinds - command line, web services, desktop apps.
Cells themselfs can form up and organize into a Systems.
Different kinds of systems can build up even more complex structures interconnecting with each other like Organisms...

Implementations:

* [organic-stem-skeleton](https://github.com/outbounder/organic-stem-skeleton)

-----
Note that the proposed concept and its respective implementations **doesn't simulate the actual nature order and processes**.
The concept follows closely nature's patterns where applicable to software development discipline.


Organic development in node.js

* [documentation](https://github.com/VarnaLab/node-organic/blob/master/docs)
* [organic-presentation-101](http://outbounder.github.io/organic-presentation-101/#/)
* [organic development (an article at net.tutsplus.com)](http://net.tutsplus.com/tutorials/javascript-ajax/organic-development/)
* [organic ecosystem](http://wisdom.camplight.net/wisdom/51194d8ca672da1148000007/ecosystem)
* [trello board](https://trello.com/board/node-organic/50659ffd3a3664af033e2024)
