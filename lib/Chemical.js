module.exports = function Chemical(input, data) {
  if(typeof input == "Object")
    for(var i in input)
      this[i] = input[i];
  else {
    this.type = type;
    this.data = data;
  }
}