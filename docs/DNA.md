# usage #

    var dna = new DNA();
    dna.loadDir("path/to/directory", function(){
      console.log(dna);
    })

# usage 2 #

    var dna = new DNA({
      "name": {
        "key": "value"
      },
      "branch": {
        "name": {
          "key": "value2",
          "key2": "value3"
        }
      }
    })

    console.log(dna.selectBranch("branch"));

    dna.mergeBranchInRoot("branch");
    console.log(dna);
