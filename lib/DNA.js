module.exports = function DNA(data){
  if(data)
    for(var key in data)
      this[key] = data[key];
}