var Chemical = require("./Chemical")

module.exports = function DNA(data){
  Chemical.call(this, data)
}
module.exports.prototype = new Chemical
