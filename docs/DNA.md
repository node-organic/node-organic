# DNA

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

## abstract DNA

### construction function DNA(data)

Should implement [Chemical's constructor function logic](./Chemical.md).

> Every property of data object if present will be copied over the DNA object.
