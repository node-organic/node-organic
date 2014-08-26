module.exports = function Chemical(data) {
  if(data)
    for(var key in data)
      this[key] = data[key]
}