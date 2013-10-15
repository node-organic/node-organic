# usage #

    var nucleus = new Nucleus({
      "branchName": {
        "organelleName": {
          "source": "path/to/module"
        }
      }
    })

    nucleus.build({
      "branch": "branchName"
    })

    nucleus.buildOne({
      "source": "path/to/module"
    })

# usage 2 #

    var nucleus = new Nucleus({
      "branchX": {
        "organelY": {
          "key": "value",
          "source": function(config, plasma, nucleus){
          }
        }
      }
    })