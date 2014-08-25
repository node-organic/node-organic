# Nucleus

Nucleus is an Organelle. It however has reactions vital for a living Cell - ability to read DNA and execute reactions involved in constructing Organelles. 

    // construct Nucleus giving its own dna branch for configuration.
    var plasma = new Plasma()
    var dna = new DNA({
      "OrganelleName": {
        "source": "path/to/organelle_implementation"
      },
      "branchName": {
        "OrganelleName2": "path/to/implementation"
      }
    })
    
    var nucleus = new Nucleus(plasma, dna)

    // add ability to construct organelles on demand via "build" typed chemical.
    plasma.on("build", nucleus.build, nucleus) 

    // build some organelles from dna
    plasma.emit({type: "build", branch: "organelles"})

## abstract Nucleus

Should implement [Organel](./Organel.md) interface.

### construction function Nucleus(plasma, dna)

Should implement construction and build logic for Nucleus Organelle.

* `plasma` is expected to implement [Plasma](./Plasma.md)
* `dna` is expected to implement [DNA](./DNA.md)

### function build(chemical [, callback])

Should implement logic for building Organelles using combined information from `chemical` argument and provided `dna` structure upon construction.

* `chemical` is expected to implement [Chemical](./Chemical.md)
* `callback` is expected to implement [ReactionFn callback form](./Reactions.md)