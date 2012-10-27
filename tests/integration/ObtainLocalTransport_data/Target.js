var organic = require("../../../index");


module.exports = organic.Organel.extend(function(plasma, config, parent){
  organic.Organel.apply(this, arguments);
  this.message = function (chemical) {
    console.log("success");
    chemical.data();
  }
});

