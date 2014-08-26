var util = require("util")
var Chemical = require("./Chemical")

module.exports = function DNA(data){
  Chemical.call(this, data)
}

util.inherits(module.exports, Chemical)