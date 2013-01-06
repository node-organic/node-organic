var glob = require("glob");
var merge = require('merge-recursive');
var fs = require("fs");
var path = require("path");

module.exports = function DNA(data){
  if(data)
    for(var key in data)
      this[key] = data[key];
}

module.exports.prototype.loadDir = function(dirPath, namespace, callback) {
  if(typeof namespace == "function") {
    callback = namespace;
    namespace = "";
  }

  dirPath = path.normalize(dirPath);

  var self = this;
  glob(dirPath+"/**/*.json", function(err, files){
    var filesLeft = files.length;
    files.forEach(function(file){
      file = path.normalize(file);
      // append namespace tail from file path
      // tail is in form X.Y.Z where '.' are path delimiters
      var target = file.replace(dirPath+path.sep, "").replace(".json", "").replace(/\//g, ".").replace(/\\/g, ".");

      if(namespace != "")
        target = namespace+"."+target; // insert '.' as namespace should be in form X.Y.Z without trailing '.'
      
      // load file data at given namespaced branch
      self.loadFile(file, target, function(){
        filesLeft -= 1;
        if(filesLeft == 0)
          callback();
      });
    });
  });
}

module.exports.prototype.createBranch = function(namespace, value) {

  // merge value if the namespace is the dna itself (namespace equal to "")
  if(namespace == "" && value) {
    if(typeof value == "object") {
      for(var key in value)
        this[key] = value[key];
    } else
      throw new Error("can not set primitive value to dna structure (error while trying this = value)");
    return;
  }

  var b = this;
  var currentB = "";
  var lastP = "", lastB = b;

  // iterate namaspace and create holder objects if they do not exist
  namespace.split(".").forEach(function(p){
    if(b[p] === undefined)
      b[p] = {};
    if(typeof b[p] != "object")
      throw new Error("can not create branch path at value "+p+" using "+currentB);
    currentB += "."+p;
    lastP = p;
    lastB = b;
    b = b[p];
  });

  // assign value to last branch
  if(value !== undefined)
    lastB[lastP] = value;
}

module.exports.prototype.selectBranch = function(namespace) {
  if(namespace == "")
    return this;
  if(namespace.indexOf(".") === -1)
    return this[namespace];
  var b = this;
  var currentB = "";
  namespace.split(".").forEach(function(p){
    if(b[p] !== undefined)
      b = b[p];
    else
      throw new Error("can not walk to branch '"+namespace+"' found gap at "+currentB);
    currentB += "."+p;
  });
  return b;
}

module.exports.prototype.loadFile = function(filePath, namespace, callback){
  if(typeof namespace == "function") {
    callback = namespace;
    namespace = "";
  }
  var self = this;
  fs.readFile(filePath, function(err, data){
    if(err) throw err;
    data = data.toString();
    try {
      data = JSON.parse(data);
    }catch(e) {
      throw "Failed to parse "+data+" at "+filePath;
    }
    self.createBranch(namespace, data);
    callback();
  });
}

module.exports.prototype.mergeBranchInRoot = function(namespace) {
  var branch = this.selectBranch(namespace);
  merge.recursive(this, branch);
}

module.exports.prototype.mapDirectoryToBranch = function(namespace, directory, callback) {
  var self = this;
  glob(directory+"/**/*.js", function(err, files){
    var filesLeft = files.length;
    files.forEach(function(file){
      file = path.normalize(file);
      // append namespace tail from file path
      // tail is in form X.Y.Z where '.' are path delimiters
      var target = file.replace(directory+path.sep, "").replace(".js", "").replace(/\//g, ".").replace(/\\/g, ".");

      if(namespace != "")
        target = namespace+"."+target; // insert '.' as namespace should be in form X.Y.Z without trailing '.'
      
      // load file data at given namespaced branch
      self.createBranch(target, {source: file.replace(".js", "")});
      filesLeft -= 1;
      if(filesLeft == 0)
        callback();
    });
  });
}