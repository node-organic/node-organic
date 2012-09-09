var util = require("util");

module.exports = function Chemical(input, data) {
  if(typeof input == "object") {
    for(var key in input)
      this[key] = input[key];
  } else {
    this.type = input;
    this.data = data;
  }
}

module.exports.extend = function(constructor){
  util.inherits(constructor, module.exports);
  return constructor;
}