# Nucleus

Nucleus is an Organelle. It however has reactions vital for a 'living' Cell - ability to read DNA and construct Organelles.

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
    nucleus.build({type: "build", branch: "organelles"})

## abstract Nucleus

Should implement [Organel](./Organel.md) interface.

### construction function Nucleus(plasma, dna)

Should implement construction and build logic for Nucleus Organelle.

* `plasma` is expected to implement [Plasma](./Plasma.md)
* `dna` is expected to implement [DNA](./DNA.md)

### function build(chemical)

Should implement logic for building Organelles using combined information from `chemical` argument and provided `dna` structure upon construction.

* `chemical` is expected to implement [Chemical](./Chemical.md)
