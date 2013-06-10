# usage #

    var cell = new Cell({
      "plasma-organelles": {
        "Organel1": {
          "source": "lib/Organel"
        },
        "Organel2": {
          "source": "lib/Organel"
        }
      }
    });
    var initChemical = {
      "type": "build",
      "branch": "plasma-organelles"
    }
    cell.emit(initChemical);

# usage 2 #

    var cell = new Cell();
    cell.emit({
      "type": "build",
      "source": "path/to/module"
    })

# usage 3 #

    var cell = new Cell();
    cell.emit({
      "type": "build",
      "organelConfigKey": "value"
      source: function Organel(plasma, config){
        console.log(config.organelConfigKey)
      }
    })

# usage 4 #

    var SuperNucleus = require("organic-nucleus");
    require("organic-nucleus-decorator-X").decorate(Nucleus)
    require("organic-nucleus-decorator-Y").decorate(Nucleus)

    var SuperPlasma = require("organic-plasma")
    require("organic-synapse").decorate(SuperPlasma);
    require("organic-plasma-multimatch").decorate(SuperPlasma);

    var cell new Cell({},{
      Nucleus: SuperNucleus,
      Plasma: SuperPlasma
    })
    cell.emit({
      "type": "build",
      "source": "path/to/module"
    })