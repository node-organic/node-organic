# DNA

Simple utility functions for managing dna

# API

## function DNA(data)
constructor
* data : Object, initial preseed of dna

## loadDir
### function(dirPath, namespace, callback)
loads given directory as dna by loading all .json files
* `dirPath` : String, directory to load
* `namespace` : String, optional holding branch in form of 
"name(.subname)*" to load the directory's dna. 
If not provided will use root branch.
* `callback` : function(){}, handler once completed

## createBranch
### function(namespace, value)
creates branch with given value
* `namespace` : String, holding branch in form of "name(.subname)*"
* `value` : Object, the dna to be assigned at the branch.

## selectBranch
### function(namespace)
parses namespace and returns branch's value
* `namespace` : String, branch's path in form of "name(.subname)*"

## loadFile
### function(filePath, namespace, callback)
loads file at given branch
* `filePath` : String, file with json contents to load
* `namespace` : String, optional branch in form of "name(.subname)*"
to load file's dna at. If not provided will use root branch.
* `callback` : function() {}, handler once completed

## mergeBranchInRoot
### function(namespace)
merges recursively given branch by namespace to root one.

Note that objects are merged recursively, but arrays are overriden entirely.

* `namespace` : String, branch in form of "name(.subname)*"

## mapDirectoryToBranch
### function(namespace, directory, callback)
Constructs branch by given namespace from directory of javascript files
The constructed branch contains every .js file as `{source: "path/to/js/file"}` node.
* `namespace` : String, branch in form of "name(.subname)*"
* `directory` : String, directory to load .js files from
* `callback` : function(){}, handler once completed

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
